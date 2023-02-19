const EmployeeForm = ({ onSave, equipments,  disabled, employee, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">First name:</label>
        <input
          defaultValue={employee ? employee.firstName : null}
          name="firstName"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="name">Middle Name:</label>
        <input
          defaultValue={employee ? employee.middleName : null}
          name="middleName"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="name">Last name:</label>
        <input
          defaultValue={employee ? employee.lastName : null}
          name="lastName"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment"
                id="equipment">
                  {equipments && equipments.map((equipment, index) => (
                    <option value={equipment.name} key={index}>{equipment.name}</option>
                  ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;