import { Table } from 'antd';
import { Popconfirm } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, InfoCircleOutlined, DeleteTwoTone, CopyOutlined } from '@ant-design/icons';
import moment from 'moment';

function generateTable(dataList, fieldsList, loading, handleDelete, handleEdit, successMessage) {

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
  };

  const columns = fieldsList.map(field => ({
    title: field.title,
    dataIndex: field.dataIndex,
    sorter: (a, b) => {
      if (field.sorterType === 'numeric') {
        return a[field.dataIndex] - b[field.dataIndex];
      } else if (field.sorterType === 'text') {
        return a[field.dataIndex].localeCompare(b[field.dataIndex]);
      } else if (field.sorterType === 'date') {
        return moment(a[field.dataIndex]).unix() - moment(b[field.dataIndex]).unix();
      }
      return 0;
    },
    render: (text, record) => {
      let value = text;
      if (typeof text === 'number') {
        value = text.toFixed(2);
        value = value.replace('.', ',');
      }
      if (typeof text === 'boolean') {
        if (value === true)
          value = <CheckCircleTwoTone twoToneColor="#53e667" style={{fontSize: '20px'}} />
        else
          value = <CloseCircleTwoTone twoToneColor="#e65353" style={{fontSize: '20px'}} />
      }
      if (field.prefix) {
        value = `${field.prefix}${value}`;
      }
      if (field.mask) {
        if (field.mask === "date"){
          value = new Date(value);
          value = value.toLocaleDateString("pt-BR", {timeZone: 'UTC'});
        }
        if (field.mask === "phone"){
          value = formatPhoneNumber(value);
        }
        if (field.mask === "int"){
          value = text.toFixed(0);
        }
        if (field.mask === "list"){
          let finalValue = '| ';
          value.map((item) => {
            finalValue += item + ' | ';
          });
          value = finalValue;
        }
        if (field.mask === "timestamp"){
          const fixedDate = value.replace('Timestamp: ', '');
          const date = new Date(fixedDate);
          value = new Intl.DateTimeFormat(['rs', 'br']).format(date);
        }
        
      }
      return value;
    }
  }));

  const copyColumn = {
    title: '#',
    key: 'ids',
    render: (text, record) => (
      <>
        <CopyOutlined onClick={() => {copyTextToClipboard(record.id); successMessage("Copiado com sucesso");}} />
      </>
    ),
  };
  columns.unshift(copyColumn);
  const actionColumn = {
    title: '',
    key: 'actions',
    render: (text, record) => (
      <>
        <InfoCircleOutlined style={{fontSize: '20px', marginRight: '20px'}} onClick={() => handleEdit(record.id)} />
        <Popconfirm
          title="Tem certeza que deseja excluir este registro?"
          onConfirm={() => handleDelete(record.id)}
          okText="Sim"
          cancelText="Não"
        >
          <DeleteTwoTone twoToneColor="#e65353" style={{fontSize: '20px'}} />
        </Popconfirm>
      </>
    ),
  };

  columns.push(actionColumn);

  return (
    <Table dataSource={dataList} columns={columns} loading={loading} responsive pagination={{ pageSize: 10 }} scroll={{ x: 'max-content' }} sortDirections={['ascend', 'descend']} defaultSortOrder="ascend" />
  );
}

export default generateTable;