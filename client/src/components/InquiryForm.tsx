import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
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

export function InquiryForm() {
  const mutation = useCreateInquiry();
  
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

  function onSubmit(data: InsertInquiry) {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
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
        <p className="text-muted-foreground">Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-foreground/80">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all placeholder:text-gray-500 text-gray-900" 
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
                  <FormLabel className="font-semibold text-foreground/80">WhatsApp / Telepon</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="0812..." 
                      className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all placeholder:text-gray-500 text-gray-900"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-foreground/80">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="email@example.com" 
                    type="email"
                    className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all placeholder:text-gray-500 text-gray-900"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-foreground/80">Jenis Layanan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all text-gray-900 data-[placeholder]:text-gray-500">
                      <SelectValue placeholder="Pilih layanan yang Anda butuhkan" />
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-foreground/80">Detail Kebutuhan</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Jelaskan detail renovasi atau perbaikan yang Anda inginkan..." 
                    className="min-h-[120px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all resize-none p-4 placeholder:text-gray-500 text-gray-900"
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
                Kirim Pesan <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
