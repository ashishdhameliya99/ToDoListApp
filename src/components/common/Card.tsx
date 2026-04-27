import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Todo } from '../../interfaces/types';
import { useAppTheme } from '../../hooks/themeContext';
import { Menu } from 'react-native-paper';
import { hp, wp } from '../../constants/ResponsiveUI';
import { toggleFavorite, updateTodo } from '../../redux/slice/toDoSlice';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { route } from '../../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { deleteTodoAndDraft } from '../../redux/actions/action';
import { useAppDispatch } from '../../utils/reduxUtil';

export default function Card({ item }: { item: Todo }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { theme } = useAppTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={styles.menuContainer}
      anchor={
        <TouchableOpacity
          style={[styles.cardContainer, { backgroundColor: theme.card }]}
          onLongPress={openMenu}
          delayLongPress={500}
        >
          <Text style={{ color: theme.text }}>Name:{item.name}</Text>
          <Text style={{ color: theme.text }}>Email:{item.email}</Text>
          <Text style={{ color: theme.text }}>
            Phone:
            {item.countryCode}
            {item.phone}
          </Text>
          <Text style={{ color: theme.text }}>
            Date:
            {new Date(item.dob).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric',
            })}
          </Text>
          {item.favorite && <Text style={{ color: theme.text }}>Favorite</Text>}
        </TouchableOpacity>
      }
    >
      <Menu.Item
        onPress={() => {
          dispatch(updateTodo(item));
          navigation.navigate(route.addItem, { data: item });
          closeMenu();
        }}
        title="Edit"
      />
      <Menu.Item
        onPress={() => {
          Alert.alert('Alert', 'r u sure???', [
            {
              text: 'OK',
              onPress: () => {
                dispatch(deleteTodoAndDraft(item.id));
              },
            },
            {
              text: 'Cancel',
              style: 'destructive',
            },
          ]);
          closeMenu();
        }}
        title="Delete"
      />
      <Menu.Item
        onPress={() => {
          dispatch(toggleFavorite(item.id));
          closeMenu();
        }}
        title={item.favorite === true ? 'Remove Favorite' : 'Add Favorite'}
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: wp(10),
    borderRadius: wp(10),
  },
  menuContainer: {
    marginLeft: wp(200),
    marginTop: hp(20),
  },
});
