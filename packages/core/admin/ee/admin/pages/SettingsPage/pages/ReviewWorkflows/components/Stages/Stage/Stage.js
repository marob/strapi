import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useField } from 'formik';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  Box,
  Grid,
  GridItem,
  IconButton,
  TextInput,
} from '@strapi/design-system';

import { Trash } from '@strapi/icons';

import { StageType } from '../../../constants';
import { deleteStage } from '../../../actions';

// TODO: Delete once https://github.com/strapi/design-system/pull/858
// is merged and released.
const StyledAccordion = styled(Box)`
  > div:first-child {
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
  }
`;

function Stage({ id, name, index, canDelete, isOpen: isOpenDefault = false }) {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const fieldIdentifier = `stages.${index}.name`;
  const [field, meta] = useField(fieldIdentifier);
  const dispatch = useDispatch();

  return (
    <StyledAccordion>
      <Accordion size="S" variant="primary" onToggle={() => setIsOpen(!isOpen)} expanded={isOpen}>
        <AccordionToggle
          title={name}
          togglePosition="left"
          action={
            canDelete ? (
              <IconButton
                onClick={() => dispatch(deleteStage(id))}
                label={formatMessage({
                  id: 'Settings.review-workflows.stage.delete',
                  defaultMessage: 'Delete stage',
                })}
                icon={<Trash />}
              />
            ) : null
          }
        />
        <AccordionContent padding={6} background="neutral0">
          <Grid gap={4}>
            <GridItem col={6}>
              <TextInput
                {...field}
                id={fieldIdentifier}
                value={name}
                label={formatMessage({
                  id: 'Settings.review-workflows.stage.name.label',
                  defaultMessage: 'Stage name',
                })}
                error={meta.error ?? false}
              />
            </GridItem>
          </Grid>
        </AccordionContent>
      </Accordion>
    </StyledAccordion>
  );
}

export { Stage };

Stage.propTypes = PropTypes.shape(StageType).isRequired;
