const fs = require('fs');
let code = fs.readFileSync('components/Contact.tsx', 'utf-8');

code = code.replace("import { Mail, MapPin, Phone } from 'lucide-react';", "import { motion } from 'motion/react';\nimport { Mail, MapPin, Phone } from 'lucide-react';");

code = code.replace('<div className="space-y-8">', '<motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-8">');
code = code.replace('</div>\n          <div className="bg-[#F7F5F0]', '</motion.div>\n          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#F7F5F0]');
code = code.replace('</form>\n          </div>', '</form>\n          </motion.div>');

code = code.replace('<div className="mt-16', '<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-16');
code = code.replace('</iframe>\n        </div>', '</iframe>\n        </motion.div>');

fs.writeFileSync('components/Contact.tsx', code);
