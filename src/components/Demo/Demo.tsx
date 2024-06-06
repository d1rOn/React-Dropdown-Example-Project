import React from 'react';
import { Form, Formik } from 'formik';

import Selectbox from '../UI/Selectbox/Selectbox';
import { Item } from '../UI/Selectbox/Selectbox.types';

import styles from './Demo.module.scss';

const selectOptions = [
  {
    value: '1',
    name: 'Office rental & CoWorking',
  },
  {
    value: '2',
    name: 'Partnership',
  },
  {
    value: '3',
    name: 'Job application',
  },
  {
    value: '4',
    name: 'Corporate',
  },
  {
    value: '5',
    name: 'Press',
  },
  {
    value: '6',
    name: 'Organize an event',
  },
  {
    value: '7',
    name: 'Other request',
  },
];

const asyncSearch = async (items: Item[], query: string) =>
  new Promise<Item[]>((resolve) => {
    setTimeout(() => {
      resolve(
        items.filter((item) =>
          item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        ),
      );
    }, 2000);
  });

const Demo: React.FC = () => (
  <div className={styles.demoBox}>
    <Formik
      initialValues={{
        helpType1: '',
        helpType2: '',
        helpType3: '',
      }}
      onSubmit={() => {}}
    >
      {() => (
        <Form>
          <fieldset
            style={{
              gridArea: 'select1',
            }}
          >
            <Selectbox
              items={selectOptions}
              shownValue={(item) => `${item.name}`}
              name='helpType1'
              label='What can we help you with?'
              placeholder='Please select'
              search={{
                placeHolder: 'Search...',
                searchFunction: (items, query) =>
                  items.filter((item) =>
                    item.name
                      .toLocaleLowerCase()
                      .includes(query.toLocaleLowerCase()),
                  ),
              }}
            />
          </fieldset>
          <fieldset
            style={{
              gridArea: 'select2',
            }}
          >
            <Selectbox
              items={selectOptions}
              shownValue={(item) => `${item.name}`}
              name='helpType2'
              label='What can we help you with?'
              placeholder='Please select'
              search={{
                placeHolder: 'Search...',
                searchFunction: (items, query) =>
                  items.filter((item) =>
                    item.name
                      .toLocaleLowerCase()
                      .includes(query.toLocaleLowerCase()),
                  ),
              }}
            />
          </fieldset>
          <fieldset
            style={{
              gridArea: 'select3',
            }}
          >
            <Selectbox
              items={selectOptions}
              shownValue={(item) => `${item.name}`}
              name='helpType3'
              label='What can we help you with?'
              placeholder='Please select'
              search={{
                placeHolder: 'Search...',
                searchFunction: asyncSearch,
              }}
            />
          </fieldset>
        </Form>
      )}
    </Formik>
  </div>
);

export default Demo;
