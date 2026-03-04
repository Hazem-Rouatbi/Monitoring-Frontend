import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Badge } from 'reactstrap'
function Feedingdetails (props) {
  return (
    <Modal size='lg' {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Feeding details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='show-grid'>
        {' '}
        <div>
          <div className='row justify-content-md-center'>
            <div className='grid-margin stretch-card'>
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
                            <th> Nombre </th>
                            <th> diffrenceserver</th>
                            <th> diffrencekiosk</th>
                            <th> Statut </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/*    "id": "money":  "currency": "TND"    "number": 3   "alert": 6,
                           */}
                          {props.datafeedingdetails.map(option => (
                            <tr key={option.id} id={option.id}>
                              <td> {option.money} </td>
                              <td>{option.number}</td>
                              <td> {option.diffrenceserver} </td>
                              <td>{option.diffrencekiosk}</td>

                              <td>
                                <Badge
                                  color={
                                    option.status == 'success'
                                      ? 'secondary-cyan'
                                      : option.status == 'failed'
                                      ? 'secondary-red'
                                      : 'primary-hover'
                                  }
                                >
                                  {option.status == 'success'
                                    ? 'Succès'
                                    : option.status == 'failed'
                                    ? 'Échec'
                                    : 'En cours'}
                                </Badge>
                              </td>
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
export default Feedingdetails
