import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";

 class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        todoList: [],
        modal: false,
        activeItem: {
          title: "",
          description: "",
          completed: false,
        },
      };
    }

    componentDidMount() {
      this.refreshList();
    }

    refreshList = () => {
		
      axios
        .get("/users/user/")
        
        .then((res) => this.setState({ userList: res.data }))
        
        .catch((err) => console.log(err));
		
    };
    
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
      this.toggle();

      if (item.id) {
        axios
          .put(`/users/user/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      axios
        .post("/users/user/", item)
        .then((res) => this.refreshList());
    };

    handleDelete = (item) => {
      axios
        .delete(`/users/user/${item.id}/`)
        .then((res) => this.refreshList());
    };

    createItem = () => {
      const item = { username: "", first_name: "", last_name: '',email: '', date_joined:'',is_active: false,  is_staff: '', is_superuser: false,last_login:'',password: ''};

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
      console.log("kkkkkk");
      console.log(this.state);
      return (
        <div className="nav nav-tabs">
          <span
            onClick={() => this.displayCompleted(true)}
            className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          >
            Complete
          </span>
          <span
            onClick={() => this.displayCompleted(false)}
            className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          >
            Incomplete
          </span>
        </div>
      );
    };

    renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.todoList.filter(
        (item) => item.completed === viewCompleted
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
            title={item.description}
          >
            {item.title}
          </span>
          <span>
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
          </span>
        </li>
        
      ));
    };

    render() {
      return (
        
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Users</h1>
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
