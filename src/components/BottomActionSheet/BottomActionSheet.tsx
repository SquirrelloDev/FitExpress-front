import {Drawer, DrawerProps} from "@mantine/core";
import {ReactNode} from "react";
import classes from "../../sass/components/bottom-action-sheet.module.scss";
interface BottomActionSheetProps extends Omit<DrawerProps, 'onClose'>{
	children: ReactNode
	opened: boolean
	close: () => void
}
function BottomActionSheet({children, opened, close, ...props}:BottomActionSheetProps) {
	return (
		<Drawer opened={opened} onClose={close} position={'bottom'} classNames={{ content: classes.sheet__content, header: classes.sheet__header, close: classes.sheet__close}} {...props}>
			{children}
		</Drawer>
	)
}
export default BottomActionSheet