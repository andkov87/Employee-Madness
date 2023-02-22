import { Link } from "react-router-dom";
import "./EmployeeTable.css";


const EmployeeTable = ({ employees, onDelete, onChange, sortLevel, sortPosition}) => {


  return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Present</th>
          <th>Level<input
              type='text'
              onChange={e => sortLevel(e)}
              placeholder="filter Level"></input></th>
          <th>Position<input
              type='text'
              onChange={e => sortPosition(e)}
              placeholder="filter Position"></input></th>         
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>           
            <td><form>
              <input 
              type='checkbox'
              onChange={() => onChange(employee)}
              checked={employee.present}
              />
              </form></td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
        };

export default EmployeeTable;
