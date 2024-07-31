import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import background from './assets/f832aad8f3050baa45248f7084d0230a.jpg';

function Register({ navigation }) {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function login() {
    navigation.navigate('login');
  }

  const handleSubmit = async () => {
    try {
      if (password === password2) {
        await axios.post('https://659e41e347ae28b0bd356ef8.mockapi.io/user', {
          username,
          password,
        });
        setUsername('');
        setPassword('');
        navigation.navigate('login');
      } else {
        alert('Loi');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.formView}>
          <UserOutlined style={styles.icon} />
          <h2>ĐĂNG KÍ NGƯỜI DÙNG</h2>
          <TextInput style={styles.form} placeholder="Họ tên" />
          <TextInput
            style={styles.form}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.form}
            placeholder="Mật khẩu"
            
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.form}
            placeholder="Nhập lại mật khẩu"
            
            value={password2}
            onChangeText={setPassword2}
          />
          <TextInput style={styles.form} placeholder="Email" />
          <TextInput style={styles.form} placeholder="Số điện thoại" />
          <Button
            onPress={handleSubmit}
            style={{ marginTop: 20 }}
            title="Đăng kí"
          />
          <Text onPress={login} style={{ marginTop: 10, color: 'yellow' }}>
            Đăng nhập
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formView: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  icon:{
    fontSize:60,
  },
  form: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: 'white',
  },
});

export default Register;
