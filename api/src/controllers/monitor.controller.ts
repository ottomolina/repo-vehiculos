import { version, name } from "../../package.json";

export default class MonitorController {
  public monitor() {
    return { name, version };
  }
}
