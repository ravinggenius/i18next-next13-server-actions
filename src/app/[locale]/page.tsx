import { Metadata } from "next";
import { ComponentProps } from "react";

import { CommonPageProps } from "@/app/common-page-props";
import { loadPageTranslations } from "@/app/i18n/server";

import { createSession } from "./actions";
import CreateSessionForm from "./form";
import styles from "./page.module.css";

export const generateMetadata = async ({
	params: { locale }
}: ComponentProps<typeof SessionsNewPage>) => {
	const { t } = await loadPageTranslations(locale, "page-sessions-new", {
		keyPrefix: "metadata"
	});

	return {
		title: t("title")
	} as Metadata;
};

export default async function SessionsNewPage({
	params: { locale }
}: CommonPageProps) {
	const { t } = await loadPageTranslations(locale, "page-sessions-new", {
		keyPrefix: "content"
	});

	return (
		<main className={styles.main}>
			<CreateSessionForm action={createSession} />
		</main>
	);
}
