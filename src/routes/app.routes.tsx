import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { Dashboard } from '../pages/Dashboard'
import { ListExpenses } from '../pages/ListExpenses'
import { SearchExpenses } from '../pages/SearchExpenses'
import { ListTotals } from '../pages/ListTotals'

type AppRoutes = {
  dashboard: undefined;
  listExpenses: undefined;
  searchExpenses: undefined;
  listTotals: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen
        name='dashboard'
        component={Dashboard}
      />

      <Screen
        name='listExpenses'
        component={ListExpenses}
      />

      <Screen
        name='searchExpenses'
        component={SearchExpenses}
      />

      <Screen
        name='listTotals'
        component={ListTotals}
      />

    </Navigator>
  )
}