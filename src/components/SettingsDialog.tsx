'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { useForm } from '@tanstack/react-form'
import { LoaderIcon } from 'lucide-react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { useSettings } from '@/contexts/SettingsContext'
import UPDATE_SPONSOR_WALLET_MUTATION from '@/lib/api/mutations/updateSponsorWallet'
import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from './ui/field'
import { Input } from './ui/input'
import { InputGroup, InputGroupInput } from './ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

type SettingsDialogProps = PropsWithChildren

// eslint-disable-next-line max-statements
const SettingsDialog = ({ children }: SettingsDialogProps) => {
  const { currency, setCurrency } = useSettings()
  const [isOpen, setIsOpen] = useState(false)
  const [localCurrency, setLocalCurrency] = useState<typeof currency>(currency)

  const { data, loading: queryLoading } = useQuery(GET_SPONSOR_WALLET)

  const form = useForm({
    defaultValues: {
      name: data?.getSponsorWallet?.name || '',
      logoUri: data?.getSponsorWallet?.logoUri || null
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(1, 'Please enter a name'),
        logoUri: z.string().nullable()
      })
    },
    onSubmit: async ({ value }) => {
      try {
        await updateSponsorWallet(value.name, value.logoUri || undefined)
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong updating the sponsor wallet')
        return
      }
    }
  })

  useEffect(() => {
    if (data?.getSponsorWallet) {
      form.setFieldValue('name', data.getSponsorWallet.name || '')
      form.setFieldValue('logoUri', data.getSponsorWallet.logoUri || null)
    }
  }, [data?.getSponsorWallet, form])

  useEffect(() => {
    setLocalCurrency(currency)
  }, [currency])

  const [updateSponsorWalletMutation, { loading: isUpdateLoading }] =
    useMutation(UPDATE_SPONSOR_WALLET_MUTATION, {
      refetchQueries: [GET_SPONSOR_WALLET],
      errorPolicy: 'all'
    })

  const isLoading = isUpdateLoading || queryLoading

  const updateSponsorWallet = async (name: string, logoUri?: string) => {
    const { data: updateData } = await updateSponsorWalletMutation({
      variables: { input: { name, logoUri } }
    })
    if (updateData?.updateSponsorWallet) {
      toast.success('User updated successfully')
    }
  }

  const handleSubmit = async () => {
    await form.handleSubmit()
  }

  const handleCurrencyChange = (newCurrency: 'EUR' | 'USD') => {
    setLocalCurrency(newCurrency)
    setCurrency(newCurrency)
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
          setLocalCurrency(currency)
        }

        setIsOpen(open)
      }}
      open={isOpen}
    >
      {children}

      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
        >
          <DialogHeader className="mb-5">
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription className="text-balance">
              Configure your application settings and sponsor wallet
              information.
            </DialogDescription>
            <DialogClose />
          </DialogHeader>

          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <form.Subscribe
                  selector={(state) => [
                    state.values.name,
                    state.values.logoUri
                  ]}
                >
                  {([walletName, logoUri]) => {
                    const hasLogoUri =
                      logoUri &&
                      typeof logoUri === 'string' &&
                      logoUri.trim() !== ''
                    const fallbackText =
                      walletName && walletName.length >= 2
                        ? `${walletName.charAt(0).toUpperCase()}${walletName.charAt(1).toUpperCase()}`
                        : walletName && walletName.length === 1
                          ? walletName.charAt(0).toUpperCase()
                          : 'U'

                    return (
                      <div className="flex justify-center">
                        <Avatar className="border-muted size-[88px] rounded-md border">
                          {hasLogoUri && (
                            <AvatarImage
                              alt={walletName || 'Your profile logo'}
                              className="rounded-none object-cover"
                              src={logoUri}
                            />
                          )}
                          <AvatarFallback className="w-full rounded-none text-center text-lg">
                            {fallbackText}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )
                  }}
                </form.Subscribe>

                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor="field--wallet-name">
                          Name
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            aria-invalid={isInvalid}
                            id="field--wallet-name"
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              field.handleChange(event.target.value)
                            }}
                            placeholder="Your name"
                            value={field.state.value}
                          />
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>

                <form.Field name="logoUri">
                  {(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="field--logo-uri">
                          Logo URL (optional)
                        </FieldLabel>
                        <Input
                          autoComplete="off"
                          id="field--logo-uri"
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value || null)
                          }
                          placeholder="https://example.com/logo.png"
                          value={field.state.value || ''}
                        />
                      </Field>
                    )
                  }}
                </form.Field>

                {/* Currency Selection */}
                <Field>
                  <FieldLabel htmlFor="field--currency">Currency</FieldLabel>
                  <Select
                    onValueChange={handleCurrencyChange}
                    value={localCurrency}
                  >
                    <SelectTrigger id="field--currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              <DialogFooter className="mt-10">
                <form.Subscribe
                  selector={(state) => [
                    state.values.name,
                    state.values.logoUri
                  ]}
                >
                  {([name, logoUri]) => {
                    const hasChanges =
                      name !== (data?.getSponsorWallet?.name || '') ||
                      logoUri !== (data?.getSponsorWallet?.logoUri || null)
                    return (
                      <Button
                        className="w-full"
                        disabled={
                          isLoading ||
                          !name ||
                          name.trim() === '' ||
                          !hasChanges
                        }
                        onClick={handleSubmit}
                        type="submit"
                      >
                        {isLoading ? (
                          <LoaderIcon className="animate-spin" />
                        ) : (
                          'Save changes'
                        )}
                      </Button>
                    )
                  }}
                </form.Subscribe>
              </DialogFooter>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
