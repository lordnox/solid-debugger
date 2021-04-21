import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { JSONNested } from "./JSONNested";
import { JSONEditableProps, JSONNodeProps } from "./p";

export const JSONArrayNode: Component<
  {
    value: any[];
    key: any;
    expanded?: boolean;
    nodeType: string;
  } & JSONNodeProps &
    JSONEditableProps
> = (props) => {
  const filteredKey = new Set(["length"]);
  const [keys, setKeys] = createSignal([], (a, b) => JSON.stringify(a) === JSON.stringify(b));
  const [length, setLength] = createSignal(0);
  const ud = () => {
    try {
      setLength(props.value.length);
      setKeys(Object.getOwnPropertyNames(props.value));
    } catch (e) {
      setLength(0);
      setKeys([]);
    }
  };
  ud();
  onMount(() => {
    let id = setInterval(ud, 100);
    onCleanup(() => clearInterval(id));
  });

  return (
    <JSONNested
      value={props.value}
      setValue={props.setValue}
      nodeType={props.nodeType}
      key={props.key}
      expanded={props.expanded ?? false}
      parent={props.parent}
      isArray={true}
      keys={keys()}
      previewKeys={keys().filter((key) => !filteredKey.has(key))}
      getValue={(key: any) => props.value[key]}
      label={`Array(${length()})`}
      bracketOpen="["
      bracketClose="]"
    />
  );
};
