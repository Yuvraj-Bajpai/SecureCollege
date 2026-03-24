export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      college_courses: {
        Row: {
          accredited: boolean | null
          active: boolean | null
          averagepackage: string | null
          code: string | null
          college_id: string
          college_name: string | null
          course: string
          created_at: string | null
          cutoff_comment: string | null
          cutoff_min: string | null
          cutoff_type: string | null
          description: string | null
          duration_years: number | null
          eligibility: string | null
          entrance: string[] | null
          fees_currency: string | null
          fees_max: number | null
          fees_min: number | null
          fees_type: string | null
          highestpackage: string | null
          id: string
          intake: number | null
          intake_type: string | null
          level: string
          medianpackage: string | null
          notablerecruiters: string[] | null
          placementpercent: string | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          accredited?: boolean | null
          active?: boolean | null
          averagepackage?: string | null
          code?: string | null
          college_id: string
          college_name?: string | null
          course: string
          created_at?: string | null
          cutoff_comment?: string | null
          cutoff_min?: string | null
          cutoff_type?: string | null
          description?: string | null
          duration_years?: number | null
          eligibility?: string | null
          entrance?: string[] | null
          fees_currency?: string | null
          fees_max?: number | null
          fees_min?: number | null
          fees_type?: string | null
          highestpackage?: string | null
          id?: string
          intake?: number | null
          intake_type?: string | null
          level: string
          medianpackage?: string | null
          notablerecruiters?: string[] | null
          placementpercent?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          accredited?: boolean | null
          active?: boolean | null
          averagepackage?: string | null
          code?: string | null
          college_id?: string
          college_name?: string | null
          course?: string
          created_at?: string | null
          cutoff_comment?: string | null
          cutoff_min?: string | null
          cutoff_type?: string | null
          description?: string | null
          duration_years?: number | null
          eligibility?: string | null
          entrance?: string[] | null
          fees_currency?: string | null
          fees_max?: number | null
          fees_min?: number | null
          fees_type?: string | null
          highestpackage?: string | null
          id?: string
          intake?: number | null
          intake_type?: string | null
          level?: string
          medianpackage?: string | null
          notablerecruiters?: string[] | null
          placementpercent?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "college_courses_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      college_leads: {
        Row: {
          college_name: string
          created_at: string
          id: string
          phone: string
          status: string | null
        }
        Insert: {
          college_name: string
          created_at?: string
          id?: string
          phone: string
          status?: string | null
        }
        Update: {
          college_name?: string
          created_at?: string
          id?: string
          phone?: string
          status?: string | null
        }
        Relationships: []
      }
      colleges: {
        Row: {
          affiliation: string | null
          approvals: string[] | null
          averagepackage: string | null
          banner_url: string | null
          campusarea: string | null
          city: string
          contact_last_checked_at: string | null
          contact_verified: boolean | null
          country: string | null
          courses: string[] | null
          created_at: string | null
          description: string | null
          email: string | null
          estd: number | null
          hero_image_url: string | null
          highestpackage: string | null
          id: string
          instagram_url: string | null
          intake_total: number | null
          linkedin_url: string | null
          logo_url: string | null
          media_verified_at: string | null
          name: string
          notablerecruiters: string[] | null
          facebook_url: string | null
          placementpercent: string | null
          phone: string | null
          rating: number | null
          rating_count: number | null
          slug: string
          state: string
          type: string | null
          updated_at: string | null
          website: string | null
          youtube_url: string | null
          youtube_video_id: string | null
        }
        Insert: {
          affiliation?: string | null
          approvals?: string[] | null
          averagepackage?: string | null
          banner_url?: string | null
          campusarea?: string | null
          city: string
          contact_last_checked_at?: string | null
          contact_verified?: boolean | null
          country?: string | null
          courses?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          estd?: number | null
          facebook_url?: string | null
          hero_image_url?: string | null
          highestpackage?: string | null
          id?: string
          instagram_url?: string | null
          intake_total?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          media_verified_at?: string | null
          name: string
          notablerecruiters?: string[] | null
          placementpercent?: string | null
          phone?: string | null
          rating?: number | null
          rating_count?: number | null
          slug: string
          state: string
          type?: string | null
          updated_at?: string | null
          website?: string | null
          youtube_url?: string | null
          youtube_video_id?: string | null
        }
        Update: {
          affiliation?: string | null
          approvals?: string[] | null
          averagepackage?: string | null
          banner_url?: string | null
          campusarea?: string | null
          city?: string
          contact_last_checked_at?: string | null
          contact_verified?: boolean | null
          country?: string | null
          courses?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          estd?: number | null
          facebook_url?: string | null
          hero_image_url?: string | null
          highestpackage?: string | null
          id?: string
          instagram_url?: string | null
          intake_total?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          media_verified_at?: string | null
          name?: string
          notablerecruiters?: string[] | null
          placementpercent?: string | null
          phone?: string | null
          rating?: number | null
          rating_count?: number | null
          slug?: string
          state?: string
          type?: string | null
          updated_at?: string | null
          website?: string | null
          youtube_url?: string | null
          youtube_video_id?: string | null
        }
        Relationships: []
      }
      counselling_bookings: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          status: string | null
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          status?: string | null
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "counselling_bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          city: string | null
          course: string | null
          created_at: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          city?: string | null
          course?: string | null
          created_at?: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          city?: string | null
          course?: string | null
          created_at?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: string | null
          course: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          age?: string | null
          course?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          age?: string | null
          course?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
