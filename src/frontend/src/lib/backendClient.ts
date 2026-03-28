import type { backendInterface } from "../backend.d";
import { createActorWithConfig } from "../config";

let _actor: backendInterface | null = null;
let _creating: Promise<backendInterface> | null = null;

function getActor(): Promise<backendInterface> {
  if (_actor) return Promise.resolve(_actor);
  if (!_creating) {
    _creating = createActorWithConfig().then((a) => {
      _actor = a;
      _creating = null;
      return a;
    });
  }
  return _creating;
}

export const backend = new Proxy({} as backendInterface, {
  get(_target, method: string) {
    return (...args: unknown[]) =>
      getActor().then((a) =>
        (a as unknown as Record<string, (...a: unknown[]) => unknown>)[method](
          ...args,
        ),
      );
  },
}) as backendInterface;
