import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from '../screens/TodoList';
import AddItem from '../screens/AddItem';
import Favorite from '../screens/Favorite';
import SaveDraft from '../screens/SaveDraft';
import TodoGraph from '../components/common/TodoGraph';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TodoList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="SaveDraft" component={SaveDraft} />
        <Stack.Screen name="TodoGraph" component={TodoGraph} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
