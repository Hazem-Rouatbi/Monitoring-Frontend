
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
function Payoutdetails (props) {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header >
        <Modal.Title id='contained-modal-title-vcenter'>
         payout details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='show-grid'>
        {' '}
        <div>
          <div className='row justify-content-md-center'>
            <div className='col-12 grid-margin stretch-card'>
              <div className='card'>
                <div className='card-body'>
                  <div className='mt-4 table-responsive'>
                    <div className='mt-4 table-responsive'>
                      <Table
                        responsive
                        className='table table-striped table-hover'
                      >
                        <thead>
                          <tr>
                            <th> Monnaie </th>
                            <th> Devise </th>
                            <th> Nombre </th>
                            <th> Seuil </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/*    "id": "money":  "currency": "TND"    "number": 3   "alert": 6,
                           */}
                          {props.datapayout.map(option => (
                            <tr key={option.id} id={option.id}>
                              <td> {option.money} </td>
                              <td>{option.currency}</td>
                              <td> {option.number} </td>
                              <td>{option.alert}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default Payoutdetails
