import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import DashboardPage from "./DashboardPage";
import RecruitPlayersPage from "./RecruitPlayersPage";
import MySquadPage from "./MySquadPage";
import LocalEventsPage from "./LocalEventsPage";
import TeamChatPage from "./TeamChatPage";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

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
    title: "Chat",
    icon: <ChatIcon />,
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

function SidebarFooter({ session, authentication }) {
  if (!session?.user) {
    return null;
  }

  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: "none",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0,
        "&:hover": {
          boxShadow: 1,
          transition: "box-shadow 0.3s ease-in-out",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ p: 2 }}>
        <Avatar
          src={session.user.image}
          alt={session.user.name}
          sx={{
            width: 40,
            height: 40,
            border: "2px solid",
            borderColor: "primary.main",
          }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body1" fontWeight="500" sx={{ lineHeight: 1.2 }}>
            {session.user.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {session.user.email}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={authentication.signOut}
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "error.main",
            },
          }}
        >
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
}

// ✅ **PropTypes Validation**
SidebarFooter.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
  authentication: PropTypes.shape({
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

// Default Props (optional, to prevent errors if session is undefined)
SidebarFooter.defaultProps = {
  session: null,
};

function useRouter() {
  const [pathname, setPathname] = React.useState(window.location.pathname);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        window.history.pushState({}, "", path);
        setPathname(String(path));
      },
    };
  }, [pathname]);

  return router;
}

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

export default function DashboardLayoutBasic() {
  const [session, setSession] = React.useState({
    user: {
      name: "Hardik Parikh",
      email: "hardikparikh19@gmail.com",
      image: "https://avatars.githubusercontent.com/u/141572034?v=4",
    },
  });

  const appAuthentication = React.useMemo(() => {
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
      signOut: () => setSession(null),
    };
  }, []);

  const router = useRouter();

  const renderPage = () => {
    switch (router.pathname) {
      case "/dashboard":
        return <DashboardPage />;
      case "/recruit":
        return <RecruitPlayersPage />;
      case "/events":
        return <LocalEventsPage />;
      case "/squad":
        return <MySquadPage />;
      case "/chat":
        return <TeamChatPage />;
      default:
        router.navigate("/dashboard");
        return <DashboardPage />;
    }
  };

  return (
    <AppProvider
      session={session}
      authentication={appAuthentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ logo: "", title: "GuildHub" }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: () => (
            <SidebarFooter
              session={session}
              authentication={{ signOut: () => setSession(null) }}
            />
          ),
        }}
        slotProps={{
          toolbarAccount: {
            slotProps: {
              popover: {
                open: false,
                sx: { display: "none" },
              },
              signOutButton: {
                sx: { display: "none" },
              },
            },
          },
        }}
        disableCollapsibleSidebar={true}
      >
        <PageContainer>{renderPage()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
