import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleArrowClick = (): void => {
    setIsOpen(!isOpen);
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
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
