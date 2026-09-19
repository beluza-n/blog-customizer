import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  setArticleState: (state: ArticleStateType) => void
}

export const ArticleParamsForm = ({ setArticleState }: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [formState, setFormState] = useState(defaultArticleState)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleArrowClick = (): void => {
    setIsOpen(!isOpen);
  }

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    setArticleState(formState)
  }

  const handleReset = (evt: React.FormEvent): void => {
    evt.preventDefault();
    setFormState(defaultArticleState)
    setArticleState(defaultArticleState)
  }

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  })

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
      <aside ref={rootRef} className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => setFormState({ ...formState, fontFamilyOption: option })}
            title="шрифт"
            />
          <RadioGroup
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
            title="размер шрифта"
          />
          <Select
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
            title="цвет шрифта"
          />
          <Separator/>
          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => setFormState({ ...formState, backgroundColor: option })}
            title="цвет фона"
            />
          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
            title="ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
