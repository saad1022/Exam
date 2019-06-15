import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Login from './Login';
import SignUp from './SignUp';
//Navigation Imports
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Login extends Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  Signup=(email,password)=>{
      try{
          if (this.state.password.length<7)
          {
              alert("Your password is short!")
              return;
          }
          firebase.auth().createUserWithEmailAndPassword(email,password)
          }
      catch(error){
              console.log(error.toString())
          }
  }
  LoginUser=(email,password)=>{
  try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
          console.log(user)
      })
  }
  catch(error){
      console.log(error.toString())
  }
  }
  
      render() {
          return (
              <View style={styles.container}>
                  <Text style={styles.header}>Registration Form</Text>
  
                  <TextInput 
                      style={styles.input}
                      placeholder="Your Email"
                      placeholderTextColor="#FFFFFF"
                      returnKeyType="next"
                      ref={(input) => this.emailInput = input}
                      //onSubmitEditing={() => this.passwordInput.focus()}
                      onChangeText={(email)=> this.setState({email})}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                       underlineColorAndroid={'transparent'}
                  />  
  
                  <TextInput 
                      secureTextEntry
                      placeholder="Password"
                      placeholderTextColor="#FFFFFF"
                      returnKeyType="go"
                      style={styles.input}
                      //ref={(input) => this.passwordInput = input}
                      onChangeText={(password)=> this.setState({password})}
                       underlineColorAndroid={'transparent'}
                  />
  
  <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
              </View>
          );
      }
  }


class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Education Details'
  }
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Education</Text>

        <Button
          title="Go to Education"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />

      </View>
    );
  }
}
//Signup
export default class SignUp extends Component {
  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('App'))
    .catch(error => this.setState({ errorMessage: error.message }))
}

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>SignUp</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp}/>
        <View>
        <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
      </View>
    )
  }
}
//Home Screen View Settings
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Resume'
  }
  render() {

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Resume</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details',)}
        />

      </View>

    );
  }
}

//Creation of the Stack Navigator
const AppNavigator = createStackNavigator({
  Login:Login,
  SignUp:SignUp,
  Home: HomeScreen,
  Details: DetailsScreen
},
  {
    initialRouteName: "Login"
  });

//Exporting while creating the App Container
// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return <AppContainer />
  }
}