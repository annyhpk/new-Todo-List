import { r as reactExports, u as useAuthContext, a as useNavigate, j as jsx, b as jsxs } from "./index-1cb03450.js";
import { U as UserAPI, L as Label, S as StyledLink, F as Form } from "./styled-126e34d8.js";
import { I as Input } from "./api-18387136.js";
function LoginPage() {
  const emailInputRef = reactExports.useRef(null);
  const passwordInputRef = reactExports.useRef(null);
  const {
    isAuthenticated,
    actions
  } = useAuthContext();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated)
      navigate("/");
  }, [isAuthenticated]);
  const onSubmitForm = reactExports.useCallback((e) => {
    e.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current)
      return;
    UserAPI.login({
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    }).then(() => {
      actions.login();
      navigate("/");
    });
  }, []);
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(Form, { title: "로그인", submitButton: "로그인", onSubmitForm, children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "아이디(email)" }),
    /* @__PURE__ */ jsx(Input, { ref: emailInputRef, name: "email", type: "email", validationType: "email", placeholder: "아이디(이메일)", msg: "'@'과 '.'을 모두 포함" }),
    /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "패스워드(password)" }),
    /* @__PURE__ */ jsx(Input, { ref: passwordInputRef, name: "password", type: "password", validationType: "password", placeholder: "********", msg: "8자리 이상" }),
    /* @__PURE__ */ jsx(StyledLink, { to: "/signup", children: "지금 가입하기" })
  ] }) });
}
export {
  LoginPage as default
};
