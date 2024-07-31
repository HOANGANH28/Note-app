import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Picker,
} from 'react-native';
import axios from 'axios';
import { Menu } from 'antd';
import {
  DeleteOutlined,
  BarsOutlined,
  CloseOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

function Home({ navigation, route }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [add, setAdd] = useState(false);
  const [selecteddate, setSelectedDate] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [id, setId] = useState('');

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  //const { username } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selecteddate && selecteddate !== 'Tất cả ghi chú') {
      const fil = data.filter((item) => item.date === selecteddate);
      setFiltered(fil);
    } else if (selecteddate === 'Tất cả ghi chú') {
      setFiltered(data);
    }
  }, [selecteddate, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://659e41e347ae28b0bd356ef8.mockapi.io/note'
      );
      setData(response.data);
      setId(response.data.id);
    } catch (e) {
      console.log(e);
    }
  };

  function plus() {
    setAdd(!add);
  }

  const detailNote = (noteTitle, noteContent, noteDate, noteId) => {
    navigation.navigate('detail', { noteTitle, noteContent, noteDate, noteId });
  };

  const addNote = async () => {
    try {
      await axios.post('https://659e41e347ae28b0bd356ef8.mockapi.io/note', {
        title: title,
        content: content,
        date: formatDDMMYYYY(date),
      });
    } catch (e) {
      console.log(e);
    }
    fetchData();

    setAdd(false);
    setTitle('');
    setContent('');
    setDate(new Date());
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://659e41e347ae28b0bd356ef8.mockapi.io/note/${id}`
      );
    } catch (e) {
      console.log(e);
    }
    fetchData();
  };

  const formatDDMMYYYY = (inputDate) => {
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [sort, setSort] = useState([]);

  useEffect(() => {
    fetch('https://659e41e347ae28b0bd356ef8.mockapi.io/note')
      .then((response) => response.json())
      .then((data) => {
        const uniqueDates = [...new Set(data.map((note) => note.date))];
        setSort(uniqueDates);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const reversedData = [...data].reverse();
  const reversedFilter = [...filtered].reverse();

  function logout() {
    navigation.navigate('login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Picker
          style={styles.select}
          selectedValue={selecteddate}
          onValueChange={(itemValue) => setSelectedDate(itemValue)}>
          <Picker.Item
            label="Tất cả ghi chú"
            style={{ backgroundColor: 'white' }}
          />
          {sort.map((i) => (
            <Picker.Item key={i} label={i} value={i} />
          ))}
        </Picker>
        <div style={styles.d}></div>
        <LogoutOutlined style={styles.d} onClick={logout}/>
      </View>

      {isMenuOpen && (
        <View style={styles.overlay}>
          <View style={styles.menu}>
            <CloseOutlined onClick={closeMenu} />
            <Text>Menu Item 1</Text>
            <Text>Menu Item 2</Text>
            <div onClick={logout} style={styles.nav}>
              Dang xuat
            </div>
          </View>
        </View>
      )}

      <div style={styles.add} onClick={plus}>
        +
      </div>

      {add ? (
        <View>
          <h3 style={styles.label}>Nhập tiêu đề</h3>
          <TextInput
            style={styles.form}
            value={title}
            onChangeText={setTitle}
          />
          <h3 style={styles.label}>Nhập nội dung</h3>
          <TextInput
            multiline
            numberOfLines={5}
            style={styles.form}
            value={content}
            onChangeText={setContent}
          />
          <button onClick={addNote} style={styles.btnAdd}>
            Tạo ghi chú
          </button>
        </View>
      ) : null}

      {selecteddate ? (
        <View style={styles.list}>
          <FlatList
            data={reversedFilter}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <div style={styles.a}>
                <div
                  style={styles.title}
                  onClick={() =>
                    detailNote(item.title, item.content, item.date, item.id)
                  }>
                  {item.title}
                </div>

                <DeleteOutlined
                  onClick={() => deleteNote(item.id)}
                  style={styles.delIcon}
                />
              </div>
            )}
          />
        </View>
      ) : (
        <View style={styles.list}>
          <FlatList
            data={reversedData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <div style={styles.a}>
                <div
                  style={styles.title}
                  onClick={() =>
                    detailNote(item.title, item.content, item.date, item.id)
                  }>
                  {item.title}
                </div>

                <DeleteOutlined
                  onClick={() => deleteNote(item.id)}
                  style={styles.delIcon}
                />
              </div>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    cursor: 'pointer',
  },
  d: {
    flex: 0.2,
  },
  list: {
    marginTop: 30,
    marginLeft: 10,
  },
  header: {
    backgroundColor: 'orange',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    display: 'flex',
  },
  select: {
    cursor: 'pointer',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    border: 0,
    borderColor: 'white',
    backgroundColor: 'orange',
    color: 'white',
  },
  delIcon: {
    flex: 1,
    textAlign: 'center',
  },
  a: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  btnMenu: {
    border: 0,
    cursor: 'pointer',
    borderRadius: 2,
    textAlign: 'center',
    marginRight: 10,
  },
  bars: {
    fontSize: 25,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFAFA',
    width: 250,
    fontSize: 18,
    cursor: 'pointer',
    height: 30,
    justifyContent: 'center',
    borderRadius: 2,
  },
  form: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  btnAdd: {
    cursor: 'pointer',
    alignSelf: 'center',
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  add: {
    border: '0 ',
    borderRadius: 50,
    width: 50,
    height: 50,
    textAlign: 'center',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    fontSize: 40,
    backgroundColor: '#008B8B',
    color: 'white',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    padding: 10,
    height: 300,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
