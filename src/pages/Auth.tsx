import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Добро пожаловать в AI Code Generator</h1>
          <p className="text-muted-foreground">
            Войдите или создайте аккаунт для начала работы
          </p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email адрес",
                  password_label: "Пароль",
                  button_label: "Войти",
                  loading_button_label: "Вход...",
                  social_provider_text: "Войти через {{provider}}",
                  link_text: "Уже есть аккаунт? Войти",
                  confirmation_text: "Проверьте свою почту для подтверждения",
                },
                sign_up: {
                  email_label: "Email адрес",
                  password_label: "Пароль",
                  button_label: "Зарегистрироваться",
                  loading_button_label: "Регистрация...",
                  social_provider_text: "Зарегистрироваться через {{provider}}",
                  link_text: "Нет аккаунта? Зарегистрироваться",
                  confirmation_text: "Проверьте свою почту для подтверждения регистрации",
                },
                forgotten_password: {
                  email_label: "Email адрес",
                  password_label: "Пароль",
                  button_label: "Сбросить пароль",
                  loading_button_label: "Отправка инструкций...",
                  link_text: "Забыли пароль?",
                  confirmation_text: "Проверьте свою почту для сброса пароля",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;