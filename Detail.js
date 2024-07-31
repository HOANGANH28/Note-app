import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  EditOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

function Detail({ navigation }) {
  const route = useRoute();
  const { noteTitle, noteContent, noteDate, noteId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [editmode, setEditMode] = useState(false);

  function back() {
    navigation.navigate('home');
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://659e41e347ae28b0bd356ef8.mockapi.io/note',{title,content,}
      );
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const modeEdit = () => {
    setEditMode(true);
    setTitle(noteTitle);
    setContent(noteContent);
  };

  const editNote = async () => {
    try {
      await axios.put(
        `https://659e41e347ae28b0bd356ef8.mockapi.io/note/${noteId}`,
        {
          title: title,
          content: content,
        }
      );
    } catch (e) {
      console.log(e);
    }
    cancelEdit();
    fetchData();
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <div style={styles.header}>
        <ArrowLeftOutlined onClick={back} style={styles.icon} />
        <div style={{ flex: 1 }}></div>
        <EditOutlined style={styles.icon} onClick={() => modeEdit()} />
      </div>

      {editmode ? (
        <View style={styles.b}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.form}
          />
          <TextInput
            multiline
            numberOfLines={5}
            value={content}
            onChangeText={setContent}
            style={styles.form}
          />
          <span style={styles.check}>
            <button style={styles.yes} onClick={editNote}>
              <CheckOutlined style={styles.icon} />
            </button>

            <button style={styles.no} onClick={cancelEdit}>
              <CloseOutlined style={styles.icon} />
            </button>
          </span>
        </View>
      ) : (
        <View>
          <h1>{noteTitle}</h1>
          <Text style={styles.content}>{noteContent}</Text>
        </View>
      )}

      <div style={styles.date}>Được tạo : {noteDate}</div>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'orange',
    height: 50,
  },
  icon: {
    fontSize: 22,
  },
  yes: {
    backgroundColor: 'green',
    marginRight: 1,
    borderRadius: 5,
    cursor: 'pointer',
  },
  no: {
    backgroundColor: 'red',
    borderRadius: 5,
    cursor: 'pointer',
  },
  check: {
    alignSelf: 'flex-end',
  },
  content: {
    fontSize: 18,
  },
  date: {
    marginTop: 'auto',
  },
  form: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  b: {
    marginTop: 30,
  },
});

export default Detail;
