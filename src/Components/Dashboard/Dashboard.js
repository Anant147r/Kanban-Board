import React from "react";
const Dashboard = () => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Backlog</th>
            <th scope="col">To Do</th>
            <th scope="col">On Going</th>
            <th scope="col">Done</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <th scope="row">1</th> */}
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>sdfgs</td>
          </tr>
          <tr>
            {/* <th scope="row">2</th> */}
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>asdf</td>
          </tr>
          <tr>
            {/* <th scope="row">3</th> */}
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>asdf</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;
