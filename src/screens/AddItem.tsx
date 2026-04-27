import { StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';

import { CountryPicker } from 'react-native-country-codes-picker';
import DatePicker from 'react-native-date-picker';

import InputBox from '../components/common/InputBox';
import { string } from '../constants/string';
import { hp, wp } from '../constants/ResponsiveUI';
import { color } from '../utils/color';
import { useAppTheme } from '../hooks/themeContext';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addDraft, addTodo } from '../redux/slice/toDoSlice';
import Toast from 'react-native-toast-message';
import { RootState } from '../utils/reduxUtil';
import { getUniqueId } from '../helpers/type';
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Todo } from '../interfaces/types';
import { route } from '../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function AddItem() {
  const { theme } = useAppTheme();
  const routes = useRoute();
  const { data } = (routes.params as { data: Todo }) || {};

  const item = data ? true : false;

  const [name, setName] = useState(data?.name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [phone, setPhone] = useState(data?.phone || '');
  const [openCountry, setOpenCountry] = useState(false);
  const [countryCode, setCountryCode] = useState(data?.countryCode || '+91');
  const [favorite, setFavorite] = useState<boolean | string>(
    data?.favorite ?? false,
  );

  const [dob, setDob] = useState(data?.dob ? new Date(data.dob) : new Date());
  const [openDate, setOpenDate] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const todos = useSelector((state: RootState) => state.user.todos);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const isAnyFieldFilled = () => {
    return !!(name || email || phone);
  };

  const isAllFieldsFilled = () => {
    return !!(name && email && phone && dob && countryCode);
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCountryCode('+91');
    setDob(new Date());
    setFavorite(false);
  };

  const dataValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email',
        position: 'top',
      });
      return false;
    }

    const emailExists = todos.some(u => {
      if (item) {
        return u.email === email && u.id !== data?.id;
      }
      return u.email === email;
    });

    if (emailExists) {
      Toast.show({
        type: 'error',
        text1: 'Duplicate Email',
        text2: 'Email already exists',
        position: 'top',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!dataValidation()) return;

    const DATA = {
      id: item ? data.id : getUniqueId(),
      name,
      email,
      phone,
      countryCode,
      dob: dob.toISOString(),
      favorite,
    };

    if (isAllFieldsFilled()) {
      dispatch(addTodo(DATA));

      Toast.show({
        type: 'success',
        text1: item ? 'Updated!' : 'Saved!',
        text2: item ? 'Data updated successfully' : 'Data saved successfully',
        position: 'top',
      });

      navigation.navigate(route.main);
    } else if (isAnyFieldFilled()) {
      dispatch(addDraft(DATA));

      Toast.show({
        type: 'info',
        text1: 'Saved as Draft',
        text2: 'Incomplete data saved',
        position: 'top',
      });

      navigation.navigate(route.saveDraft);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Empty Form',
        text2: 'Please fill at least one field',
        position: 'top',
      });
      return;
    }

    handleCancel();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.card }]}>
      {item ? (
        <Header text="Update Item" backText="Back" />
      ) : (
        <Header text="Add Item" />
      )}

      <InputBox
        placeholder={string.addItem.name}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <InputBox
        placeholder={string.addItem.Email}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        contextMenuHidden={true}
        selectionColor={color.red}
      />

      <View style={styles.phoneContainer}>
        <Button
          title={countryCode}
          onPress={() => setOpenCountry(true)}
          color={theme.button}
        />

        <InputBox
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.inputCode}
          maxLength={10}
          keyboardType="phone-pad"
        />
      </View>

      <InputBox
        placeholder="Select DOB"
        value={formatDate(dob)}
        editable={false}
        style={styles.input}
        onPressIn={() => setOpenDate(true)}
      />

      <View style={styles.favorite}>
        <Text style={{ color: theme.text }}>Favorite</Text>
        <Switch value={!!favorite} onValueChange={setFavorite} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={
            isAllFieldsFilled()
              ? 'Save'
              : isAnyFieldFilled()
              ? 'Save Draft'
              : 'Save'
          }
          onPress={handleSubmit}
          color={theme.button}
          disabled={!isAnyFieldFilled()}
        />

        <Button title="Cancel" onPress={handleCancel} color="gray" />
      </View>

      <CountryPicker
        show={openCountry}
        lang="en"
        pickerButtonOnPress={items => {
          setCountryCode(items.dial_code);
          setOpenCountry(false);
        }}
      />

      <DatePicker
        modal
        open={openDate}
        date={dob}
        mode="date"
        onConfirm={date => {
          setDob(date);
          setOpenDate(false);
        }}
        onCancel={() => setOpenDate(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
  },
  input: {
    height: hp(50),
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 8,
    paddingHorizontal: wp(15),
    backgroundColor: color.liteWhite,
    marginBottom: hp(10),
    justifyContent: 'center',
  },
  inputCode: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 8,
    backgroundColor: color.liteWhite,
    marginBottom: hp(10),
    marginTop: 10,
    padding: 12,
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
});
