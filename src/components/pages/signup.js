import React, { Component } from "react";
import Modal from "./signupModal";
import axios from "axios";

 class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      userList: [],
      modal: false,
      activeItem: {
        id:"",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        is_superuser: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://192.168.1.10:8000/users/user/")
      .then((resp) => this.setState({ userList: resp.data}))
      
      .catch((err) => console.log("error",err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    console.log(item);
    if (item.id) {
      axios
        .put(`http://192.168.1.10:8000/users/user/${item.id}/`, item)
        .then((res) => this.refreshList())
        .catch((err) => console.log("lll",err));
      return;
    }
    axios
      .post("http://192.168.1.10:8000/users/user/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://192.168.1.10:8000/users/users/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { id:"",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_superuser: "", };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Superuser
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Users
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.userList.filter(
      (item) => item.is_superuser === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.username}
        >
          {item.username}
        </span>
        {/* <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span> */}
      </li>
    ));
  };

  render() {
    return (
      
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add Users
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default SignUp;








//  {/*  const SignUp = () => { 
// return (
// 	<div className="form">
//           <div className="form-body">
//               <div className="username">
//                   <label className="form__label" htmlFor="firstName">First Name </label>
//                   <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
//               </div>
//               <div className="lastname">
//                   <label className="form__label" htmlFor="lastName">Last Name </label>
//                   <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
//               </div>
//               <div className="email">
//                   <label className="form__label" htmlFor="email">Email </label>
//                   <input  type="email" id="email" className="form__input" placeholder="Email"/>
//               </div>
//               <div className="password">
//                   <label className="form__label" htmlFor="password">Password </label>
//                   <input className="form__input" type="password"  id="password" placeholder="Password"/>
//               </div>
//               <div className="confirm-password">
//                   <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
//                   <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
//               </div>
//           </div>
	
//               <button type="submit" onClick={(datas) => {
// 						axios
// 						.post("/createusers/", datas)
// 				}} className="btn">
// 					Register
// 					</button>
// 					</div>       
					
	
// );
// };

// export default SignUp; */}
