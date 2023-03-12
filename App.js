import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListLitem from './src/components/ListLitem';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const App = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [textField, setInputField] = useState('');
  const [arr, setArr] = useState([]);
  const [changeItem, setChange] = useState(false);
  const [editID, setEditID] = useState(null);
  console.log(arr);

  const saveHandler = () => {
    if (textField == '') {
      Alert.alert('', 'enter the value');
    } else {
      const newValue = {
        id: arr.length + 1,
        value: textField,
      };
      setArr([...arr, newValue]);
      setInputField('');
      setIsShowing(false);
    }
  };

  const deleteHandler = id => {
    setArr(item => item.filter(value => value.id !== id));
  };

  const editHandler = id => {
    const findItem = arr.find(item => item.id === id);
    setInputField(findItem.value);
    setIsShowing(true);
    setChange(true);
    setEditID(id);
  };

  const changeHandler = () => {
    const test = {value: textField};
    const updated = arr.map(item => {
      if (item.id == editID) {
        return {...item, ...test};
      }
      return item;
    });

    setArr(updated);
    setInputField('');
    setIsShowing(false);
    setChange(false);
  };

  const removeAllHandler = () => {
    setArr([]);
  };

  const showHandler = () => {
    setIsShowing(!isShowing);
    setInputField('');
  };

  const cancelHandler = () => {
    setInputField('');
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.title}>TODO List</Text>
        <View style={styles.topContainer}>
          {isShowing ? (
            <View style={styles.textContainer}>
              <TextInput
                value={textField}
                onChangeText={text => setInputField(text)}
                placeholder="what to do..."
                placeholderTextColor="#fff"
                style={styles.textField}
              />
              <TouchableOpacity
                style={styles.closeIconbtn}
                onPress={showHandler}>
                <Ionicons
                  name="close"
                  size={26}
                  color="red"
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addIconbtn}
              onPress={id => showHandler(id)}>
              <Text style={styles.addText}>Add Todo</Text>
              <Feather
                name="plus"
                size={26}
                color="#fff"
                style={styles.addIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {isShowing && (
          <View style={styles.btnContainer}>
            {textField == '' ? (
              <View style={styles.savebtn1}>
                <Text style={styles.savebtnText}>Save</Text>
              </View>
            ) : changeItem == false ? (
              <TouchableOpacity style={styles.savebtn2} onPress={saveHandler}>
                <Text style={styles.savebtnText}>save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.savebtn2} onPress={changeHandler}>
                <Text style={styles.savebtnText}>Update</Text>
              </TouchableOpacity>
            )}
            {textField == '' ? (
              <View style={styles.cancelbtn1} onPress={cancelHandler}>
                <Text style={styles.cancelbtnText}>Clear</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.cancelbtn2}
                onPress={cancelHandler}>
                <Text style={styles.cancelbtnText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={{position: 'absolute', top: 250}}>
        <FlatList
          keyExtractor={item => item.id}
          data={arr}
          renderItem={({item}) => {
            return (
              <View style={styles.bottomContainer}>
                <ListLitem
                  value={item.value}
                  id={item.id}
                  deletebtn={deleteHandler}
                  editbtn={editHandler}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    width: Width,
    height: Height,
    backgroundColor: '#808080',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },

  textContainer: {
    flexDirection: 'row',
  },
  textField: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    width: Width - 90,
    marginTop: 20,
    marginLeft: 15,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  addIconbtn: {
    backgroundColor: '#3ACF3A',
    width: '90%',
    height: 52,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    // right: 6,
    top: 10,
  },

  removeAll: {
    backgroundColor: '#fff',
    width: 90,
    padding: 6,
    borderRadius: 10,
    position: 'absolute',
    right: 20,
    top: 80,
  },

  addText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeIconbtn: {
    width: 52,
    height: 52,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 16,
    marginLeft: 8,
  },
  closeIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },

  addIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  savebtn1: {
    backgroundColor: 'green',
    padding: 15,
    width: 80,
    borderRadius: 5,
    opacity: 0.6,
  },
  savebtn2: {
    backgroundColor: 'green',
    padding: 15,
    width: 80,
    borderRadius: 5,
  },
  savebtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelbtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelbtn1: {
    backgroundColor: 'red',
    padding: 15,
    width: 80,
    borderRadius: 5,
    marginRight: 60,
    opacity: 0.6,
  },
  cancelbtn2: {
    backgroundColor: 'red',
    padding: 15,
    width: 80,
    borderRadius: 5,
    marginRight: 60,
  },
  bottomContainer: {
    width: Width - 30,
    marginLeft: 10,
  },
});
