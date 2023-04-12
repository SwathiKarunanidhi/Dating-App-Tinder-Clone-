import { Component } from "react";
import Nav from "../components/Nav";
import {Cookies} from 'react-cookie';
import { Navigate } from 'react-router-dom';
import {update_user} from '../actions';
import {connect} from 'react-redux';

const cookies = new Cookies();

class Onboarding extends Component
{ 
  
  constructor (props)
 {
  super(props);
  this.state = {
  user_id:cookies.get('UserId'),
  email:cookies.Email,
  first_name:'',
  DOB_Day:'',
  DOB_Month:'',
  DOB_Year:'',
  Gender_Identity:'Man',
  Show_Gender:false,
  About:'',
  Gender_Interest:'Woman',
  Profile_Image:{data:null},
  imgUrl:'',
  matches:[],
  redirect:null,
  error:null
 }
 this.handleChange = this.handleChange.bind(this);
}
  handleChange = async (e) => {
    
    let value = e.target.value;
    if(e.target.type === "file")
    {
      let img = e.target.files[0];
      value = img;
      this.setState({imgUrl : URL.createObjectURL(img)});
      const Image = {
                data: img
      }
      this.setState({Profile_Image:Image})     
      return;
    }
    else if(e.target.type  === "checkbox" )
     {
      value =  e.target.checked;
     } 
    else
    {
     value =  e.target.value;
    } 
    
    const name = e.target.name;
    console.log("value:",value,"name:",name);
    await this.setState 
     ({
      [name]:value
    }) 
    console.log(this.state);
   
  } 
  handleSubmit = async(e) =>{
    e.preventDefault();
    
    try{
          let formData = new FormData();
         
          formData.append ("file",this.state.Profile_Image.data);
          formData.append ("user_id", this.state.user_id);
          formData.append ("first_name", this.state.first_name);
          formData.append ("DOB_Day",this.state.DOB_Day);
          formData.append ("DOB_Month",this.state.DOB_Month);
          formData.append ("DOB_Year",this.state.DOB_Year);
          formData.append ("Gender_Identity",this.state.Gender_Identity);
          formData.append ("Show_Gender",this.state.Show_Gender);
          formData.append ("About",this.state.About)
          formData.append ("Gender_Interest",this.state.Gender_Interest);
          var newfile = formData.get('file');
          
          const config = {
          headers: {
           'content-type': 'multipart/form-data', 
          },
    };
          console.log(newfile.name);
          const res = await this.props.update_user(formData,config);
          const status = res.status===201;
          console.log(status)                     
          if(status===true)
          {
           
            this.setState({redirect:res});  
            
          }
          
                        
      }
      
    catch(err)
    {
        console.log("Onboarding:",err);
        this.setState({error:err})
    }
   
  }
  
  render()
  {
      return(
          <div>
              <Nav  
                minimal={true}
                setShowModal={()=>{}}
                showModal={false}
                />
               {this.state.error && <p>{this.state.error}</p>}
               {this.state.redirect && (<Navigate to="/Dashboard" replace={true} />) } 
              <div className="onboarding"> 
                <h2> Create Account </h2>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                <section>
                 <label htmlFor="first_name">First_Name</label>
                        <input 
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={this.state.first_name}
                        required={true}
                        placeholder="First Name"
                        onChange={this.handleChange}/>
                        
                        <label htmlFor="DOB">Date Of Birth</label>
                        <div className="multiple-input-container">
                        <input 
                        id="DOB_Day"
                        name="DOB_Day"
                        type="number"
                        value={this.state.DOB_Day}
                        required={true}
                        placeholder="DD"
                        onChange={this.handleChange}/>
                       
                        <input 
                        id="DOB_Month"
                        name="DOB_Month"
                        type="number"
                        value={this.state.DOB_Month}
                        required={true}
                        placeholder="MM"
                        onChange={this.handleChange}/>

                       <input 
                        id="DOB_Year"
                        name="DOB_Year"
                        type="number"
                        value={this.state.DOB_Year}
                        required={true}
                        onChange={this.handleChange}
                        placeholder="YYYY"
                        />           
                      </div>

                  <label htmlFor="Gender">Gender</label>
                      <div className="multiple-input-container">
                      <input 
                        id="Gender_Identity_Man"
                        name="Gender_Identity"
                        type="radio"
                        value="Man"
                        onChange={this.handleChange}
                        checked={this.state.Gender_Identity==="Man"}
                       /> 
                      <label htmlFor="Gender_Identity_Man">Man</label>

                      <input 
                        id="Gender_Identity_Woman"
                        name="Gender_Identity"
                        type="radio"
                        value="Woman"
                        onChange={this.handleChange}
                        checked={this.state.Gender_Identity==="Woman"}
                        /> 
                     <label htmlFor="Gender_Identity_Woman">Woman</label>  

                     <input 
                        id="Gender_Identity_More"
                        name="Gender_Identity"
                        type="radio"
                        value="More"
                        checked={this.state.Gender_Identity==="More"}
                        onChange={this.handleChange}/> 
                     <label htmlFor="Gender_Identity_More">More</label>  
                      </div>

                  <label htmlFor="Show_Gender">Show Gender in Profile</label>  
                     <div className="multiple-input-container">
                     <input 
                        id="Show_Gender"
                        name="Show_Gender"
                        type="checkbox"
                        checked={this.state.Show_Gender}
                        onChange={this.handleChange}/> 
                       </div> 
                     
                  <label >Show Me</label>
                      <div className="multiple-input-container">
                       <input 
                        id="Gender_Interest_Man"
                        name="Gender_Interest"
                        type="radio"
                        value="Man"
                        checked={this.state.Gender_Interest==="Man"}
                        onChange={this.handleChange}/> 
                       <label htmlFor="Gender_Interest_Man">Man</label>

                       <input 
                        id="Gender_Interest_Woman"
                        name="Gender_Interest"
                        type="radio"
                        value="woman"
                        checked={this.state.Gender_Interest==="Woman"}
                        onChange={this.handleChange}/> 
                       <label htmlFor="Gender_Interest_Woman">Woman</label>  

                       <input 
                        id="Gender_Interest_Everyone"
                        name="Gender_Interest"
                        type="radio"
                        value="Everyone"
                        checked={this.state.Gender_Interest==="Everyone"}
                        onChange={this.handleChange}/> 
                       <label htmlFor="Gender_Interest_Everyone">Everyone</label>  
                      </div>      
                      
                  <label htmlFor="About">About Me</label>  
                         <input 
                            id="About"
                            name="About"
                            type="textarea"
                            required={true}
                            placeholder="I like to play videogames.."
                            value={this.state.About}
                            onChange={this.handleChange}/> 
                 <input type="submit"></input>
               </section>
               <section>
                    <label htmlFor="about">Profile</label>
                      <div >
                      <input
                       type="file"
                       name="Profile_Image"
                       id="Profile_Image"
                       accept="image/*"
                       required={true}
                       onChange={this.handleChange}
                       />
                      </div>
                      <div className="photo-container">
                        {this.state.Profile_Image && <img src={this.state.imgUrl} alt=" Profile Pic"/>}
                      </div>
               </section>
                </form>
              </div> 
              
          </div>
      )
  }
}
function mapStateToProps (state )
  {
    return state;
  }

export default connect(mapStateToProps, {update_user})(Onboarding);