import { Container, Stack, MenuItem, Button, LinearProgress } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { Select, TextField } from 'formik-mui'
import { usePayerAccounts } from '../hooks/payers'
import { validateAmout, validatePayeeAccount, validatePayee, validatePurpose } from '../helpers/validations'
import { formatAmount } from '../helpers/formatters'
import { sendPayment } from '../api/payments'
import { Payment } from '../types'

const PaymentForm = () => {
  const { isLoading, payerAccounts } = usePayerAccounts('payerId')
  return (
    <Container fixed maxWidth="xs">
      <h1>Payment Form</h1>
      {
        isLoading || (payerAccounts.length === 0)
          ? <LinearProgress />
          : (
            <Formik
              initialValues={{
                payerAccount: payerAccounts[0].id,
                amount: 0,
                purpose: '',
                payeeAccount: '',
                payee: '',
              }}
              onSubmit={(values: Payment, { setSubmitting }) => {
                sendPayment(values)
                  .then((res) => {
                    setSubmitting(false)
                    alert(JSON.stringify(res, null, 2))
                  })
              }}
            >
              {({ values, submitForm, isSubmitting }) => (
                <Form>
                  <Stack spacing={2}>
                    <Field
                      component={Select}
                      required
                      type="text"
                      label="Payer Account"
                      name="payerAccount"
                    >
                      {payerAccounts.map((account) => (
                        <MenuItem
                          key={account.id} 
                          value={account.id}>
                            {account.iban} ({formatAmount(account.balance)})
                        </MenuItem>
                      ))}
                    </Field>
                    <Field
                      component={TextField}
                      required
                      type="number"
                      label="Amount"
                      name="amount"
                      validate={() => {
                        const balance = payerAccounts.find(({ id }) => id === values.payerAccount)?.balance
                        return validateAmout(values.amount, balance)
                      }}
                    />
                    <Field
                      component={TextField}
                      required
                      type="text"
                      label="Payee Account"
                      name="payeeAccount"
                      validate={validatePayeeAccount}
                    />
                    <Field
                      component={TextField}
                      required
                      type="text"
                      label="Payee"
                      name="payee"
                      validate={validatePayee}
                    />
                    <Field
                      component={TextField}
                      type="text"
                      required
                      InputProps={{ multiline: true, minRows: 1 }}
                      label="Purpose"
                      name="purpose"
                      validate={validatePurpose}
                    />    
                  </Stack>
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Send
                  </Button>
                </Form>
              )}
            </Formik>
          )
      }
    </Container>
  )
}

export default PaymentForm
