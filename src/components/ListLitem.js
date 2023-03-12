import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListLitem = ({value, deletebtn, editbtn, id}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.content} numberOfLines={1}>
        {value}
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.editbtn} onPress={() => editbtn(id)}>
          <FontAwsome name="pencil-square-o" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deletebtn}
          onPress={() => deletebtn(id)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListLitem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    maxWidth: 450,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'red',
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  editbtn: {
    backgroundColor: '#0000FF',
    padding: 8,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  deletebtn: {
    backgroundColor: 'red',
    padding: 8,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
