import classNames from "classnames";
import { ReactNode } from "react";

import ExampleList, { Example } from "@/components/ExampleList/ExampleList";
import FeedbackList, { Feedback } from "@/components/FeedbackList/FeedbackList";
import Pre from "@/components/Pre/Pre";

import styles from "./Field.module.css";

export interface FieldMeta {
	dirty: boolean;
	focus: boolean;
}

export default function Field({
	children,
	className,
	debug = false,
	description,
	examples = [],
	feedback = [],
	id,
	label,
	meta,
	name,
	required = false
}: {
	children: ReactNode;
	className?: string;
	debug?: boolean;
	description?: string;
	examples?: Array<Example>;
	feedback?: Array<Feedback>;
	id: string;
	label: string;
	meta: FieldMeta;
	name: string;
	required?: boolean;
}) {
	return (
		<div className={classNames(styles.layout, className)}>
			<label className={styles.label} htmlFor={id}>
				<span className={styles["label-text"]}>{label}</span>

				<span className={styles["label-indicator"]}>
					{required ? "(required)" : "(optional)"}
				</span>
			</label>

			<div className={styles.label}>{children}</div>

			<FeedbackList {...{ feedback }} />

			{description ? (
				<p className={styles.description}>{description}</p>
			) : null}

			<ExampleList {...{ examples }} />

			{debug ? (
				<Pre>
					{JSON.stringify(
						{
							name,
							required,
							meta,
							description,
							examples,
							feedback
						},
						null,
						2
					)}
				</Pre>
			) : null}
		</div>
	);
}