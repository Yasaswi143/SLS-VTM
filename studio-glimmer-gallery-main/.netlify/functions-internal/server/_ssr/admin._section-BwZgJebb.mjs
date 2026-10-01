import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as AdminSectionRoute } from "./admin-app-B1hpda-H.mjs";
import { t as Route } from "./admin._section-DlxEpCRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._section-BwZgJebb.js
var import_jsx_runtime = require_jsx_runtime();
function SectionPage() {
	const { section } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionRoute, { section });
}
//#endregion
export { SectionPage as component };
