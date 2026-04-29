import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { route } from '../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
import TodoListButton from '../components/common/TodoListButton';
import DashBoardCard from '../components/common/DashBoardCard';

export default function TodoList() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { dark, toggleTheme, theme } = useAppTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const todos = useSelector((state: RootState) => state.user.todos);
  const filterData = todos.filter(item => item.favorite === true);
  const others = todos.filter(item => item.favorite !== true);
  const reorderedTodos = [...filterData, ...others];

  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handlePress = (buttonName: string, targetRoute: string) => {
    setSelectedButton(buttonName);
    navigation.navigate(targetRoute);
  };
  const renderItem = ({ item }: { item: Todo }) => <Card item={item} />;
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <DashBoardCard />
        <View style={styles.buttonContainer}>
          <TodoListButton
            title={string.TodoList.favorite}
            onPress={() => handlePress('favorite', route.favorite)}
            isSelected={selectedButton === 'favorite'}
            theme={theme}
          />
          <TodoListButton
            title={string.TodoList.saveDraft}
            onPress={() => handlePress('draft', route.saveDraft)}
            isSelected={selectedButton === 'draft'}
            theme={theme}
          />
          <TodoListButton
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
          showsVerticalScrollIndicator={false}
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
                <AddItem onClose={handleClose} />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
