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
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import background from './assets/51c74b1857094045ace12611aa884d9c.jpg';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUser = async () => {
    try {
      const response = await axios.get(
        'https://659e41e347ae28b0bd356ef8.mockapi.io/user',
        { username }
      );
      const user = response.data[0];
      if (user) {
        setUserId(user.id);
        setIsModalOpen(false);
        setIsModalOpen2(true);
      } else {
        console.log('User not found');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePass = async () => {
    if (newPassword2 === newPassword) {
      try {
        await axios.put(
          `https://659e41e347ae28b0bd356ef8.mockapi.io/user/${userId}`,
          { password: newPassword }
        );
        setIsModalOpen2(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Loi');
    }
  };

  const handleSignup = () => {
    navigation.navigate('register');
  };

  const handleSubmit = async () => {
    const response = await axios.get(
      'https://659e41e347ae28b0bd356ef8.mockapi.io/user'
    );
    const user = response.data.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      navigation.navigate('home', {
        username: username,
      });
    } else {
      console.log('Login failed');
    }
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.formView}>
          <UserOutlined style={styles.icon} />
          <h2>ĐĂNG NHẬP</h2>
          <TextInput
            style={styles.form}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.form}
            placeholder="Mật khẩu"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            onPress={handleSubmit}
            title="Đăng nhập"
            style={{ marginTop: 10 }}></Button>
          <Text
            onPress={handleSignup}
            style={{ marginTop: 10, color: 'green' }}>
            Tạo tài khoản
          </Text>

          <Text onPress={showModal} style={{ marginTop: 10, color: 'red' }}>
            Quên mật khẩu
          </Text>
          <Modal
            title="Điền tên đăng nhập"
            open={isModalOpen}
            onOk={handleUser}
            onCancel={closeModal}>
            <TextInput
              style={styles.pass}
              value={username}
              onChangeText={setUsername}></TextInput>
          </Modal>

          <Modal
            title="Thay đổi mật khẩu"
            open={isModalOpen2}
            onOk={handlePass}
            onCancel={closeModal2}>
            <TextInput
              placeholder="Mật khẩu mới"
              style={styles.pass}
              value={newPassword}
              onChangeText={setNewPassword}></TextInput>
            <TextInput
              placeholder="Nhập lại mật khẩu"
              style={styles.pass}
              value={newPassword2}
              onChangeText={setNewPassword2}></TextInput>
          </Modal>
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
  btnLogin: {
    width: 200,
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
    height: 50,
  },
  icon: {
    fontSize: 60,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  form: {
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  pass: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignContent: 'center',
    marginBottom: 10,
  },
  formView: {
    alignItems: 'center',
  },
});

export default Login;
