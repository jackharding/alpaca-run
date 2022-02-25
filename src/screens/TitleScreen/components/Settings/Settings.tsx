import { rem } from 'polished';
import React, { FormEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../../../../components/Checkbox';
import TextArea from '../../../../components/TextArea';
import { useGameContext } from '../../../../context/game.context';
import PageLayout from '../../layouts/PageLayout';

type SettingsProps = {
	onBack: () => void;
};

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
	const { useCustomText, customText, onUpdateCustomText, onToggleCustomText } =
		useGameContext();

	return (
		<PageLayout>
			<BackButton onClick={onBack}>Back</BackButton>

			<Form>
				<Checkbox
					label="Use custom text"
					checked={useCustomText}
					onChange={onToggleCustomText}
				/>

				<TextArea
					hideLabel
					label="Custom text"
					value={customText}
					onChange={onUpdateCustomText}
					disabled={!useCustomText}
				/>
			</Form>
		</PageLayout>
	);
};

const Label = styled.label``;

const Form = styled.form`
	display: grid;
	grid-gap: ${rem(12)};
	width: 100%;
	max-width: 400px;
`;

const BackButton = styled.button`
	align-self: flex-start;
`;

export default Settings;
