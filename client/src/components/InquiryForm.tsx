import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const serviceOptions = [
  "Atap Bocor",
  "Dinding Lembab",
  "Tarik Listrik",
  "Renovasi Dapur",
  "Renovasi Kamar Mandi",
  "Pasang Kanopi",
  "Pembuatan Furniture",
  "Pasang AC",
  "Cor Dak Beton",
  "Lainnya"
];

interface InquiryFormProps {
  selectedService?: string;
}

export function InquiryForm({ selectedService }: InquiryFormProps) {
  const mutation = useCreateInquiry();
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  // Update service type when a service card is clicked
  React.useEffect(() => {
    if (selectedService) {
      form.setValue("serviceType", selectedService);
    }
  }, [selectedService, form]);

  function onSubmit(data: InsertInquiry) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        setSubmitted(true);
      },
    });
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border/50 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold font-display text-foreground mb-3">Pesan Terkirim!</h3>
        <p className="text-gray-500 mb-2">Tim kami akan menghubungi Anda via WhatsApp dalam <span className="font-semibold text-foreground">1x24 jam</span>.</p>
        <p className="text-sm text-gray-400 mb-6">Butuh respons lebih cepat?</p>
        <a
          href="https://wa.me/6281188819865?text=Halo%20Ratunda%2C%20saya%20baru%20saja%20mengisi%20formulir%20di%20website."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
        >
          <MessageSquare className="w-5 h-5" /> Chat WhatsApp Langsung
        </a>
        <button
          onClick={() => setSubmitted(false)}
          className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Kirim pesan lagi
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border/50"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold font-display text-primary mb-2">Konsultasi Gratis Sekarang</h3>
        <p className="text-muted-foreground">Isi formulir singkat ini — tim kami akan menghubungi via WhatsApp dalam 1x24 jam.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-foreground/80">Nama <span className="text-red-400">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Anda"
                      autoComplete="name"
                      className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all placeholder:text-gray-400 text-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-foreground/80">No. WhatsApp <span className="text-red-400">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0812..."
                      type="tel"
                      autoComplete="tel"
                      className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all placeholder:text-gray-400 text-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-foreground/80">Jenis Layanan <span className="text-red-400">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all text-gray-900 data-[placeholder]:text-gray-400">
                      <SelectValue placeholder="Pilih layanan yang dibutuhkan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 shadow-xl z-[100]">
                    {serviceOptions.map((option) => (
                      <SelectItem key={option} value={option} className="hover:bg-gray-100 cursor-pointer">{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-foreground/80">Email <span className="text-gray-300 font-normal text-xs">(opsional)</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    autoComplete="email"
                    className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all placeholder:text-gray-400 text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-foreground/80">Detail Kebutuhan <span className="text-gray-300 font-normal text-xs">(opsional)</span></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ceritakan singkat kebutuhan renovasi Anda..."
                    className="min-h-[100px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all resize-none p-4 placeholder:text-gray-400 text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="
              w-full h-14 rounded-xl font-bold text-lg
              bg-primary text-white shadow-lg shadow-primary/25
              hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5
              active:translate-y-0 disabled:opacity-70
              transition-all duration-200
            "
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Mengirim...
              </>
            ) : (
              <>
                Dapatkan Konsultasi Gratis
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Gratis, tanpa komitmen</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Respon via WA 1x24 jam</span>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
