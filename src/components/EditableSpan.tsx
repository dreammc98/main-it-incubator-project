import { CSSProperties, ChangeEvent, useState } from "react";

type Props = {
  oldTitle: string | undefined;
  changeTitleHandler: (newTitle: string) => void;
  style?: CSSProperties | undefined;
};

export const EditableSpan = ({ oldTitle, changeTitleHandler, style }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string | undefined>(oldTitle);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const activatedEditMode = () => {
    setEditMode(true);
  };

  const deactivatedEdotMode = (newTitle: string | undefined) => {
    if (newTitle !== undefined && newTitle.trim() !== "") {
      changeTitleHandler(newTitle.trim());
    } else {
      return;
    }

    setEditMode(false);
  };

  return (
    <>
      {editMode ? (
        <input
          value={newTitle}
          autoFocus
          onBlur={() => deactivatedEdotMode(newTitle)}
          onChange={(event) => onChangeTitle(event)}
        />
      ) : (
        <span onDoubleClick={activatedEditMode} style={style}>
          {oldTitle}
        </span>
      )}
    </>
  );
};