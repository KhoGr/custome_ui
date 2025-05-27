import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "@/context/NotificationContext";
import { VipProvider } from "@/context/VipContext";
import ChatBot from "@/components/ChatBot";
import AppRoutes from "@/routes/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <VipProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            <ChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </VipProvider>
    </NotificationProvider>
  </QueryClientProvider>
);

export default App;
