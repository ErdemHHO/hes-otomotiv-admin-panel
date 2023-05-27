import React from 'react'
import { Button,Table } from 'react-bootstrap'
import { AiFillDelete,AiFillSetting } from 'react-icons/ai'

function TableCom() {
  return (
    <div>
          <div class="table-responsive text-center">
            <Table responsive="sm" hover bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Seri Adı</th>
                    <th>İşlemler</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>
                        <AiFillSetting size={32} style={{ color: '#004fd9' }} />
                        <AiFillDelete size={32} style={{ color: '#d90016' }} />
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>
                        <AiFillSetting size={32} style={{ color: '#004fd9' }} />
                        <AiFillDelete size={32} style={{ color: '#d90016' }} />
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>
                        <AiFillSetting size={32} style={{ color: '#004fd9' }} />
                        <AiFillDelete size={32} style={{ color: '#d90016' }} />
                    </td>
                </tr>
                </tbody>
            </Table>
          </div>
    </div>
  )
}

export default TableCom