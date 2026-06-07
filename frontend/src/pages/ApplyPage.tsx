import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Box,Button,TextField,Typography,Select,MenuItem,
  FormControl,FormLabel,RadioGroup,FormControlLabel,
  Radio,Checkbox,FormHelperText,Grid,Chip,Paper,
} from "@mui/material";
import { ApplySchema, type ApplyData } from "../validation/ApplySchema";

const availableSkills = ["React", "TypeScript", "Node.js", "Git", "Docker"];

const ApplyPage = () => {
  const [submittedData, setSubmittedData] = useState<ApplyData | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ApplyData>({
    mode: "onChange",
    resolver: zodResolver(ApplySchema),
    defaultValues: {
      skills: [],
      agreeToTerms: false,
    },
  });

  const selectedSkills = watch("skills") || [];

  const handleSkillChange = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setValue(
        "skills",
        selectedSkills.filter((s) => s !== skill),
        { shouldValidate: true }
      );
    } else {
      setValue("skills", [...selectedSkills, skill], { shouldValidate: true });
    }
  };

  const onSubmit = (data: ApplyData) => {
    console.log(data);
    setSubmittedData(data);
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "#e0e0e0",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 229, 255, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00e5ff",
        boxShadow: "0 0 12px rgba(0, 229, 255, 0.2)",
      },
    },
    "& .MuiFormHelperText-root": {
      mx: 0,
      mt: 0.8,
    },
  };

  if (submittedData) {
    return (
      <Box
        sx={{
          background: "radial-gradient(circle at 50% 50%, #1a1f36 0%, #0a0c16 100%)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            maxWidth: 600,
            width: "100%",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 230, 118, 0.3)",
            color: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 20px 50px rgba(0, 230, 118, 0.05)",
          }}
        >
          <Typography variant="h4" color="#00e676" gutterBottom sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
            Анкету прийнято
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#94a3b8" }}>
            Вітаємо! Форма успішно пройшла валідацію. Перевірте консоль розробника для перегляду структури об'єкта.
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, borderTop: "1px solid rgba(255,255,255,0.1)", pt: 3 }}>
            <Typography sx={{ color: "#94a3b8" }}><strong>Кандидат:</strong> <span style={{ color: "#fff" }}>{submittedData.firstName} {submittedData.lastName}</span></Typography>
            <Typography sx={{ color: "#94a3b8" }}><strong>Email:</strong> <span style={{ color: "#fff" }}>{submittedData.email}</span></Typography>
            <Typography sx={{ color: "#94a3b8" }}><strong>Телефон:</strong> <span style={{ color: "#fff" }}>{submittedData.phone}</span></Typography>
            <Typography sx={{ color: "#94a3b8" }}><strong>Позиція:</strong> <span style={{ color: "#00e5ff", textTransform: "uppercase", fontWeight: "bold" }}>{submittedData.position}</span></Typography>
            <Typography sx={{ color: "#94a3b8" }}>
              <strong>Стек:</strong>{" "}
              {submittedData.skills.map((s) => (
                <Chip key={s} label={s} size="small" sx={{ mr: 0.5, backgroundColor: "rgba(0, 229, 255, 0.1)", color: "#00e5ff", border: "1px solid rgba(0, 229, 255, 0.2)" }} />
              ))}
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "radial-gradient(circle at 50% 50%, #121624 0%, #070913 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: { xs: 3, md: 6 },
          maxWidth: 1000,
          width: "100%",
          background: "rgba(255, 255, 255, 0.01)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#ffffff",
          borderRadius: "28px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
        }}
      >
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 900, letterSpacing: "-1px", background: "linear-gradient(45deg, #00e5ff 30%, #7209b7 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Анкета кандидата
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
            Заповніть інформацію для вступу на програму стажування
          </Typography>
        </Box>

        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "inline-block", backgroundColor: "rgba(0, 229, 255, 0.08)", px: 2, py: 0.5, borderRadius: "20px", mb: 3 }}>
              <Typography variant="caption" sx={{ color: "#00e5ff", fontWeight: 800, letterSpacing: "1px" }}>
                ОСОБИСТІ ДАНІ
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Ім'я *</FormLabel>
                <TextField fullWidth {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName?.message} sx={inputStyles} />
              </Grid>
              <Grid item xs={6}>
                <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Прізвище *</FormLabel>
                <TextField fullWidth {...register("lastName")} error={!!errors.lastName} helperText={errors.lastName?.message} sx={inputStyles} />
              </Grid>
            </Grid>

            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Email *</FormLabel>
              <TextField fullWidth type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} sx={inputStyles} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Телефон *</FormLabel>
              <TextField fullWidth placeholder="+380XXXXXXXXX" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} sx={inputStyles} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Дата народження *</FormLabel>
              <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} {...register("birthDate")} error={!!errors.birthDate} helperText={errors.birthDate?.message} sx={inputStyles} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "inline-block", backgroundColor: "rgba(114, 9, 183, 0.15)", px: 2, py: 0.5, borderRadius: "20px", mb: 3 }}>
              <Typography variant="caption" sx={{ color: "#b5179e", fontWeight: 800, letterSpacing: "1px" }}>
                ПОЗИЦІЯ ТА ДОСВІД
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Позиція *</FormLabel>
              <Controller
                name="position"
                control={control}
                defaultValue="frontend"
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.position} sx={inputStyles}>
                    <Select {...field}>
                      <MenuItem value="frontend">Frontend</MenuItem>
                      <MenuItem value="backend">Backend</MenuItem>
                      <MenuItem value="fullstack">Fullstack</MenuItem>
                      <MenuItem value="design">Design</MenuItem>
                    </Select>
                    <FormHelperText>{errors.position?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset" error={!!errors.experience}>
                <FormLabel component="legend" sx={{ color: "#94a3b8", mb: 1, fontSize: "0.85rem" }}>Досвід роботи *</FormLabel>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup { ...field } sx={{ gap: 0.5 }}>
                      {[
                        { val: "none", label: "Немає досвіду" },
                        { val: "less1", label: "Менше 1 року" },
                        { val: "1to3", label: "1-3 роки" },
                        { val: "3plus", label: "Більше 3 років" }
                      ].map((item) => (
                        <FormControlLabel
                          key={item.val}
                          value={item.val}
                          control={<Radio sx={{ color: "rgba(255,255,255,0.2)", "&.Mui-checked": { color: "#00e5ff" } }} />}
                          label={<Typography sx={{ color: "#e0e0e0", fontSize: "0.95rem" }}>{item.label}</Typography>}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                <FormHelperText>{errors.experience?.message}</FormHelperText>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset" error={!!errors.skills}>
                <FormLabel component="legend" sx={{ color: "#94a3b8", mb: 1, fontSize: "0.85rem" }}>Технології *</FormLabel>
                <Grid container spacing={1}>
                  {availableSkills.map((skill) => {
                    const isChecked = selectedSkills.includes(skill);
                    return (
                      <Grid item xs={6} key={skill}>
                        <Box
                          onClick={() => handleSkillChange(skill)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "10px",
                            backgroundColor: isChecked ? "rgba(0, 229, 255, 0.08)" : "rgba(255,255,255,0.02)",
                            border: isChecked ? "1px solid rgba(0, 229, 255, 0.3)" : "1px solid rgba(255,255,255,0.05)",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" }
                          }}
                        >
                          <Checkbox
                            checked={isChecked}
                            sx={{ p: 0.5, color: "rgba(255,255,255,0.2)", "&.Mui-checked": { color: "#00e5ff" } }}
                          />
                          <Typography sx={{ color: isChecked ? "#00e5ff" : "#e0e0e0", fontSize: "0.9rem", ml: 0.5 }}>{skill}</Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                <FormHelperText sx={{ mt: 1.5 }}>{errors.skills?.message}</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, pt: 4, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Box sx={{ display: "inline-block", backgroundColor: "rgba(255,255,255,0.05)", px: 2, py: 0.5, borderRadius: "20px", mb: 4 }}>
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 800, letterSpacing: "1px" }}>
              ДОДАТКОВО (НЕОБОВ'ЯЗКОВО)
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Бажана зарплата, грн</FormLabel>
              <TextField fullWidth type="number" placeholder="наприклад, 25000" {...register("salaryExpected")} error={!!errors.salaryExpected} helperText={errors.salaryExpected?.message} sx={inputStyles} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Готовий розпочати з</FormLabel>
              <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} {...register("startDate")} error={!!errors.startDate} helperText={errors.startDate?.message} sx={inputStyles} />
            </Grid>
          </Grid>

          <Box sx={{ my: 3 }}>
            <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Портфоліо або GitHub</FormLabel>
            <TextField fullWidth placeholder="https://github.com/username" {...register("portfolioUrl")} error={!!errors.portfolioUrl} helperText={errors.portfolioUrl?.message} sx={inputStyles} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <FormLabel sx={{ color: "#94a3b8", display: "block", mb: 1, fontSize: "0.85rem" }}>Супровідний лист</FormLabel>
            <TextField fullWidth multiline rows={4} placeholder="Розкажіть трохи про свій досвід..." {...register("coverLetter")} error={!!errors.coverLetter} helperText={errors.coverLetter?.message} sx={inputStyles} />
          </Box>

          <Box sx={{ mb: 4, px: 1 }}>
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.agreeToTerms}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{ color: "rgba(255,255,255,0.2)", "&.Mui-checked": { color: "#00e5ff" } }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        Я погоджуюсь з <span style={{ color: "#00e5ff", cursor: "pointer", textDecoration: "underline" }}>умовами участі</span> у стажуванні *
                      </Typography>
                    }
                  />
                  <FormHelperText>{errors.agreeToTerms?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 2,
              borderRadius: "14px",
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "none",
              background: "linear-gradient(135deg, #00e5ff 0%, #0083b0 100%)",
              boxShadow: "0 8px 30px rgba(0, 229, 255, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #00f0ff 0%, #0093c4 100%)",
                boxShadow: "0 12px 40px rgba(0, 229, 255, 0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Надіслати анкету
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ApplyPage;