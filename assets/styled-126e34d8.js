import { c as createStyled, r as reactExports, j as jsx, b as jsxs, F as Fragment, t as tokenStorage, L as Link } from "./index-1cb03450.js";
import { i as instance } from "./api-18387136.js";
const StyledFrom = /* @__PURE__ */ createStyled("form", {
  target: "e1hsg0co2"
})({
  name: "1y651qg",
  styles: "display:inherit;gap:0.6em"
});
const FormWrapper = /* @__PURE__ */ createStyled("div", {
  target: "e1hsg0co1"
})({
  name: "al8dxk",
  styles: "display:grid;gap:0.6em;width:20rem;padding:1.25rem;border:2px solid gray;border-radius:0.75em;margin-top:7em"
});
const Button = /* @__PURE__ */ createStyled("button", {
  target: "e1hsg0co0"
})({
  name: "529i0s",
  styles: "font-weight:bold;border:1px solid;width:7rem;justify-self:center;background-color:#cbd5e1"
});
function Form({
  children,
  onSubmitForm,
  title,
  submitButton
}) {
  const [check, setCheck] = reactExports.useState(false);
  const onChangeForm = reactExports.useCallback((e) => {
    const form = new FormData(e.currentTarget);
    if (form.get("email") && form.get("password")) {
      setCheck(true);
      return;
    }
    setCheck(false);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(FormWrapper, { children: [
    /* @__PURE__ */ jsx("h3", { children: title }),
    /* @__PURE__ */ jsxs(StyledFrom, { onSubmit: onSubmitForm, onChange: onChangeForm, children: [
      children,
      check ? /* @__PURE__ */ jsx(Button, { type: "submit", children: submitButton }) : /* @__PURE__ */ jsx(Button, { type: "submit", disabled: true, children: submitButton })
    ] })
  ] }) });
}
class UserAPI {
  static login(loginForm) {
    return instance.post("/users/login", loginForm).then((response) => {
      const token = response.data.token;
      tokenStorage.setToken(token);
      return response.data.msg;
    }).catch((error) => {
      throw new Error(`Login failed: ${error}`);
    });
  }
  static signup(signupForm) {
    return instance.post("/users/create", signupForm).then((response) => {
      const token = response.data.token;
      tokenStorage.setToken(token);
      return response.data.msg;
    }).catch((error) => {
      throw new Error(`Signup failed: ${error}`);
    });
  }
}
const StyledLink = /* @__PURE__ */ createStyled(Link, {
  target: "e1wne2mi1"
})({
  name: "1b71mh8",
  styles: "text-decoration:none;color:#9ca3af;justify-self:end;font-size:0.75rem;line-height:1rem"
});
const Label = /* @__PURE__ */ createStyled("label", {
  target: "e1wne2mi0"
})({
  name: "zfflrq",
  styles: "font-size:0.75em;line-height:1em;color:lightgray"
});
export {
  Form as F,
  Label as L,
  StyledLink as S,
  UserAPI as U
};
