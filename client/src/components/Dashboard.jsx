import * as React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
// import Grid from "@mui/material/Grid2";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "recruit",
    title: "Recruit Players",
    icon: <PeopleIcon />,
  },
  {
    segment: "events",
    title: "Local Events",
    icon: <EmojiEventsIcon />,
  },
  {
    segment: "chat",
    title: "Chat Rooms",
    icon: <ChatIcon />,
    children: [
      {
        segment: "team-chat",
        title: "Team Chat",
        icon: <GroupsIcon />,
        fullPath: "/chat/team-chat",
      },
      {
        segment: "game-chat",
        title: "Game chat",
        icon: <SportsEsportsIcon />,
        fullPath: "/chat/game-chat",
      },
    ],
  },
  {
    segment: "squad",
    title: "My Squad",
    icon: <GroupsIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

// const Skeleton = styled("div")(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

export default function DashboardLayoutBasic() {
  const [session, setSession] = React.useState({
    user: {
      name: "Hardik Parikh",
      email: "hardikparikh19@gmail.com",
      image: "https://avatars.githubusercontent.com/u/141572034?v=4",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Hardik Parikh",
            email: "hardikparikh19@gmail.com",
            image: "https://avatars.githubusercontent.com/u/141572034?v=4",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter("/dashboard");

  //   const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ logo: "", title: "GuildHub" }}
    >
      <DashboardLayout>
        <PageContainer>
          {/* <Grid container spacing={1}>
            {[...Array(18)].map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton height={250} />
              </Grid>
            ))}
          </Grid> */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
