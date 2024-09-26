import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { IonActionSheet, IonIcon } from '@ionic/react';
import { ellipsisVerticalCircle } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core';

enum SheetActions {
  Delete = "Delete",
  Edit = "Edit",
  Cancel = "Cancel",
}

interface SheetData {
  action: SheetActions,
  listId: string,
}

export interface props {
  onEdit: () => void,
  onDelete: () => void,
  title: string,
  id: string,
}

export default function WordListLocalMenu({ onEdit, onDelete, title, id }: props) {
  const [isOpen, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggle = (e: any) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const logResult = (result: OverlayEventDetail<SheetActions>) => {
    console.log(JSON.stringify(result, null, 2));
    if (result.data === SheetActions.Edit) {
      onEdit()
    }

    if (result.data === SheetActions.Delete) {
      onDelete()
    }
  };

  const prevOpen = React.useRef(isOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && isOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isOpen;
  }, [isOpen]);

  return (
    <Stack direction="row" spacing={2}>
      <div style={{
        zIndex: isOpen ? 900 : 600
      }}>
        <Button

          ref={anchorRef}
          id={"open-action-sheet-" + id}
          aria-controls={isOpen ? 'composition-menu' : undefined}
          aria-expanded={isOpen ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <IonIcon
            style={{ fontSize: '24px', cursor: 'pointer' }}
            icon={ellipsisVerticalCircle}
          />
        </Button>
        <IonActionSheet
          trigger={"open-action-sheet-" + id}
          header="Actions"
          mode='ios'
          onDidDismiss={({ detail }) => logResult(detail)}
          buttons={[
            {
              text: SheetActions.Delete,
              role: 'edit',
              data: SheetActions.Delete,
            },
            {
              text: SheetActions.Edit,
              role: 'edit',
              data: SheetActions.Edit
            },
            {
              text: 'Cancel',
              role: 'cancel',
              data: SheetActions.Cancel,
            },
          ]}
        ></IonActionSheet>
      </div>
    </Stack>
  );
}