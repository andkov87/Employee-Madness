import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const fetchEmployeesByPosition = (query) => {
  fetch(`/position?search=${query}`, {}).then((res) => res.json())
  console.log(query)
}

const fetchEmployeesByLevel = (query) => {
  console.log(query)
  fetch(`/level?search=${query}`, {}).then((res) => res.json())
}

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const updateBoolean = (employee, id) => {
  fetch(`/api/employees/${employee._id}`, { 
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(employee, id),
  }).then((res) => res.json())
}

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });
    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });   
  };

  const handleChangeBoolean = (employee, id) => {
    employee.present = !employee.present
    updateBoolean(employee, id)

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);    
    });
  }

  const sortPosition = (e) => {
    fetchEmployeesByPosition(e.target.value)
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      throw error;
    })
  }

  const sortLevel = (e) => {
    fetchEmployeesByLevel(e.target.value)
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      throw error;
    })
  }



  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        console.log(employees)
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={data} onDelete={handleDelete} onChange={handleChangeBoolean} sortLevel={sortLevel} sortPosition={sortPosition}/>;
};

export default EmployeeList;
