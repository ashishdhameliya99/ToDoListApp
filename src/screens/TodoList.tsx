import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { route } from '../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/common/Button';
import { styles } from './styles/TodoList';
import { string } from '../constants/string';
import { useAppTheme } from '../hooks/themeContext';
import AddItem from './AddItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/reduxUtil';
import Card from '../components/common/Card';
import { Todo } from '../interfaces/types';

export default function TodoList() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { dark, toggleTheme, theme } = useAppTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todos = useSelector((state: RootState) => state.user.todos);
  console.log('all data=-=======', todos);

  const filterData = todos.filter(item => item.favorite === true);
  const others = todos.filter(item => item.favorite !== true);
  const reorderedTodos = [...filterData, ...others];

  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderItem = ({ item }: { item: Todo }) => <Card item={item} />;
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.buttonContainer}>
          <Button
            title={string.TodoList.favorite}
            onPress={() => navigation.navigate(route.favorite)}
            color={theme.button}
          />
          <Button
            title={string.TodoList.saveDraft}
            onPress={() => navigation.navigate(route.saveDraft)}
            color={theme.button}
          />
          <Button
            title={dark ? 'Switch to Light' : 'Switch to Dark'}
            onPress={toggleTheme}
            color={theme.button}
          />
        </View>
        <FlatList
          data={reorderedTodos}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.cardContainer}
        />
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.stickyButton, { backgroundColor: theme.button }]}
              onPress={handleOpen}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ backgroundColor: theme.card }}
              handleIndicatorStyle={{ backgroundColor: theme.text }}
            >
              <BottomSheetView>
                <AddItem />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
