

import {
  MainApp,
  MainPage,
  Lesson1,
  PageGraphiQL,
} from "modules/ReactStudy";

// console.log('AppB', AppB);

// App.contextTypes = { store: React.PropTypes.object };

export default {
  path: "/",
  component: MainApp,
  indexRoute: { 
    component: MainPage 
  },
  childRoutes: [
    {
      path: "/react-lessons/",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/react-lessons/lesson1",
      name: "Lesson1",
      component: Lesson1
    },
    {
      path: "/react-lessons/lesson2",
      name: "GraphiQL",
      component: PageGraphiQL
    },
    // {
    //   path: "*",
    //   name: "notfound",
    //   component: MainPage
    // }
  ]
};
