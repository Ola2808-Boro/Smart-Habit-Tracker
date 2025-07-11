PGDMP  ;    4                }           smart_habit_tracker    17.4    17.4 X    Q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            R           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            S           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            T           1262    16793    smart_habit_tracker    DATABASE     y   CREATE DATABASE smart_habit_tracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
 #   DROP DATABASE smart_habit_tracker;
                     postgres    false                        2615    16794    habit_tracker    SCHEMA        CREATE SCHEMA habit_tracker;
    DROP SCHEMA habit_tracker;
                     postgres    false            �            1255    16883    insert_note_function()    FUNCTION     _  CREATE FUNCTION habit_tracker.insert_note_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
    RAISE NOTICE 'Trigger uruchomiony: przypisywanie note_id = % do activity_date = %', NEW.note_id, CURRENT_DATE;

    UPDATE habit_tracker.activity
    SET note_id = NEW.note_id
    WHERE activity_date = CURRENT_DATE;

    RETURN NEW;
END;
$$;
 4   DROP FUNCTION habit_tracker.insert_note_function();
       habit_tracker               postgres    false    6            �            1259    16796    activity    TABLE     �   CREATE TABLE habit_tracker.activity (
    activity_id bigint NOT NULL,
    user_id integer NOT NULL,
    note_id integer,
    activity_date date NOT NULL,
    mood_id integer,
    habit_tracker_detail_id bigint NOT NULL
);
 #   DROP TABLE habit_tracker.activity;
       habit_tracker         heap r       postgres    false    6            �            1259    16795    activity_activity_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.activity_activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE habit_tracker.activity_activity_id_seq;
       habit_tracker               postgres    false    219    6            U           0    0    activity_activity_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE habit_tracker.activity_activity_id_seq OWNED BY habit_tracker.activity.activity_id;
          habit_tracker               postgres    false    218            �            1259    16989 $   activity_habit_tracker_detail_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.activity_habit_tracker_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE habit_tracker.activity_habit_tracker_detail_id_seq;
       habit_tracker               postgres    false    6    219            V           0    0 $   activity_habit_tracker_detail_id_seq    SEQUENCE OWNED BY     {   ALTER SEQUENCE habit_tracker.activity_habit_tracker_detail_id_seq OWNED BY habit_tracker.activity.habit_tracker_detail_id;
          habit_tracker               postgres    false    237            �            1259    16891    category    TABLE     �   CREATE TABLE habit_tracker.category (
    category_id bigint NOT NULL,
    category_name character varying(20) NOT NULL,
    user_id integer NOT NULL
);
 #   DROP TABLE habit_tracker.category;
       habit_tracker         heap r       postgres    false    6            �            1259    16805    habit    TABLE     �   CREATE TABLE habit_tracker.habit (
    habit_id bigint NOT NULL,
    habit_name character varying(30) NOT NULL,
    user_id integer NOT NULL
);
     DROP TABLE habit_tracker.habit;
       habit_tracker         heap r       postgres    false    6            �            1259    16931    habit_category    TABLE     �   CREATE TABLE habit_tracker.habit_category (
    habit_category_id bigint NOT NULL,
    habit_id integer NOT NULL,
    category_id integer,
    user_id integer
);
 )   DROP TABLE habit_tracker.habit_category;
       habit_tracker         heap r       postgres    false    6            �            1259    16890 $   habit_category_habit_category_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_category_habit_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE habit_tracker.habit_category_habit_category_id_seq;
       habit_tracker               postgres    false    6    233            W           0    0 $   habit_category_habit_category_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE habit_tracker.habit_category_habit_category_id_seq OWNED BY habit_tracker.category.category_id;
          habit_tracker               postgres    false    232            �            1259    16934 %   habit_category_habit_category_id_seq1    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_category_habit_category_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE habit_tracker.habit_category_habit_category_id_seq1;
       habit_tracker               postgres    false    6    234            X           0    0 %   habit_category_habit_category_id_seq1    SEQUENCE OWNED BY     |   ALTER SEQUENCE habit_tracker.habit_category_habit_category_id_seq1 OWNED BY habit_tracker.habit_category.habit_category_id;
          habit_tracker               postgres    false    235            �            1259    16804    habit_habit_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_habit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE habit_tracker.habit_habit_id_seq;
       habit_tracker               postgres    false    6    221            Y           0    0    habit_habit_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE habit_tracker.habit_habit_id_seq OWNED BY habit_tracker.habit.habit_id;
          habit_tracker               postgres    false    220            �            1259    16812    habit_tracker    TABLE     �   CREATE TABLE habit_tracker.habit_tracker (
    habit_tracker_id bigint NOT NULL,
    habit_id integer NOT NULL,
    duration interval(2) NOT NULL,
    habit_tracker_detail_id bigint NOT NULL
);
 (   DROP TABLE habit_tracker.habit_tracker;
       habit_tracker         heap r       postgres    false    6            �            1259    16961 )   habit_tracker_habit_tracker_detail_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_tracker_habit_tracker_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 G   DROP SEQUENCE habit_tracker.habit_tracker_habit_tracker_detail_id_seq;
       habit_tracker               postgres    false    223    6            Z           0    0 )   habit_tracker_habit_tracker_detail_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE habit_tracker.habit_tracker_habit_tracker_detail_id_seq OWNED BY habit_tracker.habit_tracker.habit_tracker_detail_id;
          habit_tracker               postgres    false    236            �            1259    16811 "   habit_tracker_habit_tracker_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq;
       habit_tracker               postgres    false    223    6            [           0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq OWNED BY habit_tracker.habit_tracker.habit_tracker_id;
          habit_tracker               postgres    false    222            �            1259    16819    mood    TABLE     �   CREATE TABLE habit_tracker.mood (
    mood_id bigint NOT NULL,
    mood character varying(255),
    color character varying(7) NOT NULL,
    user_id integer
);
    DROP TABLE habit_tracker.mood;
       habit_tracker         heap r       postgres    false    6            �            1259    16818    mood_mood_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.mood_mood_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.mood_mood_id_seq;
       habit_tracker               postgres    false    6    225            \           0    0    mood_mood_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE habit_tracker.mood_mood_id_seq OWNED BY habit_tracker.mood.mood_id;
          habit_tracker               postgres    false    224            �            1259    16826    note    TABLE     �   CREATE TABLE habit_tracker.note (
    note_id bigint NOT NULL,
    answer character varying(255) NOT NULL,
    question_id integer NOT NULL
);
    DROP TABLE habit_tracker.note;
       habit_tracker         heap r       postgres    false    6            �            1259    16825    note_note_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.note_note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.note_note_id_seq;
       habit_tracker               postgres    false    227    6            ]           0    0    note_note_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE habit_tracker.note_note_id_seq OWNED BY habit_tracker.note.note_id;
          habit_tracker               postgres    false    226            �            1259    16833    question    TABLE     w   CREATE TABLE habit_tracker.question (
    question_id bigint NOT NULL,
    question character varying(255) NOT NULL
);
 #   DROP TABLE habit_tracker.question;
       habit_tracker         heap r       postgres    false    6            �            1259    16832    question_question_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.question_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE habit_tracker.question_question_id_seq;
       habit_tracker               postgres    false    6    229            ^           0    0    question_question_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE habit_tracker.question_question_id_seq OWNED BY habit_tracker.question.question_id;
          habit_tracker               postgres    false    228            �            1259    16840    user    TABLE       CREATE TABLE habit_tracker."user" (
    user_id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    date_join date NOT NULL
);
 !   DROP TABLE habit_tracker."user";
       habit_tracker         heap r       postgres    false    6            �            1259    16839    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.user_user_id_seq;
       habit_tracker               postgres    false    231    6            _           0    0    user_user_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE habit_tracker.user_user_id_seq OWNED BY habit_tracker."user".user_id;
          habit_tracker               postgres    false    230            �           2604    16799    activity activity_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.activity ALTER COLUMN activity_id SET DEFAULT nextval('habit_tracker.activity_activity_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.activity ALTER COLUMN activity_id DROP DEFAULT;
       habit_tracker               postgres    false    219    218    219            �           2604    16990     activity habit_tracker_detail_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.activity ALTER COLUMN habit_tracker_detail_id SET DEFAULT nextval('habit_tracker.activity_habit_tracker_detail_id_seq'::regclass);
 V   ALTER TABLE habit_tracker.activity ALTER COLUMN habit_tracker_detail_id DROP DEFAULT;
       habit_tracker               postgres    false    237    219            �           2604    16894    category category_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.category ALTER COLUMN category_id SET DEFAULT nextval('habit_tracker.habit_category_habit_category_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.category ALTER COLUMN category_id DROP DEFAULT;
       habit_tracker               postgres    false    232    233    233            �           2604    16808    habit habit_id    DEFAULT     ~   ALTER TABLE ONLY habit_tracker.habit ALTER COLUMN habit_id SET DEFAULT nextval('habit_tracker.habit_habit_id_seq'::regclass);
 D   ALTER TABLE habit_tracker.habit ALTER COLUMN habit_id DROP DEFAULT;
       habit_tracker               postgres    false    220    221    221            �           2604    16935     habit_category habit_category_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.habit_category ALTER COLUMN habit_category_id SET DEFAULT nextval('habit_tracker.habit_category_habit_category_id_seq1'::regclass);
 V   ALTER TABLE habit_tracker.habit_category ALTER COLUMN habit_category_id DROP DEFAULT;
       habit_tracker               postgres    false    235    234            �           2604    16815    habit_tracker habit_tracker_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.habit_tracker ALTER COLUMN habit_tracker_id SET DEFAULT nextval('habit_tracker.habit_tracker_habit_tracker_id_seq'::regclass);
 T   ALTER TABLE habit_tracker.habit_tracker ALTER COLUMN habit_tracker_id DROP DEFAULT;
       habit_tracker               postgres    false    223    222    223            �           2604    16822    mood mood_id    DEFAULT     z   ALTER TABLE ONLY habit_tracker.mood ALTER COLUMN mood_id SET DEFAULT nextval('habit_tracker.mood_mood_id_seq'::regclass);
 B   ALTER TABLE habit_tracker.mood ALTER COLUMN mood_id DROP DEFAULT;
       habit_tracker               postgres    false    224    225    225            �           2604    16829    note note_id    DEFAULT     z   ALTER TABLE ONLY habit_tracker.note ALTER COLUMN note_id SET DEFAULT nextval('habit_tracker.note_note_id_seq'::regclass);
 B   ALTER TABLE habit_tracker.note ALTER COLUMN note_id DROP DEFAULT;
       habit_tracker               postgres    false    226    227    227            �           2604    16836    question question_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.question ALTER COLUMN question_id SET DEFAULT nextval('habit_tracker.question_question_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.question ALTER COLUMN question_id DROP DEFAULT;
       habit_tracker               postgres    false    229    228    229            �           2604    16843    user user_id    DEFAULT     |   ALTER TABLE ONLY habit_tracker."user" ALTER COLUMN user_id SET DEFAULT nextval('habit_tracker.user_user_id_seq'::regclass);
 D   ALTER TABLE habit_tracker."user" ALTER COLUMN user_id DROP DEFAULT;
       habit_tracker               postgres    false    230    231    231            <          0    16796    activity 
   TABLE DATA           y   COPY habit_tracker.activity (activity_id, user_id, note_id, activity_date, mood_id, habit_tracker_detail_id) FROM stdin;
    habit_tracker               postgres    false    219   �r       J          0    16891    category 
   TABLE DATA           N   COPY habit_tracker.category (category_id, category_name, user_id) FROM stdin;
    habit_tracker               postgres    false    233   �r       >          0    16805    habit 
   TABLE DATA           E   COPY habit_tracker.habit (habit_id, habit_name, user_id) FROM stdin;
    habit_tracker               postgres    false    221   �r       K          0    16931    habit_category 
   TABLE DATA           b   COPY habit_tracker.habit_category (habit_category_id, habit_id, category_id, user_id) FROM stdin;
    habit_tracker               postgres    false    234   s       @          0    16812    habit_tracker 
   TABLE DATA           m   COPY habit_tracker.habit_tracker (habit_tracker_id, habit_id, duration, habit_tracker_detail_id) FROM stdin;
    habit_tracker               postgres    false    223   Es       B          0    16819    mood 
   TABLE DATA           D   COPY habit_tracker.mood (mood_id, mood, color, user_id) FROM stdin;
    habit_tracker               postgres    false    225   ss       D          0    16826    note 
   TABLE DATA           C   COPY habit_tracker.note (note_id, answer, question_id) FROM stdin;
    habit_tracker               postgres    false    227   �s       F          0    16833    question 
   TABLE DATA           @   COPY habit_tracker.question (question_id, question) FROM stdin;
    habit_tracker               postgres    false    229   �s       H          0    16840    user 
   TABLE DATA           h   COPY habit_tracker."user" (user_id, first_name, last_name, email, password_hash, date_join) FROM stdin;
    habit_tracker               postgres    false    231   �x       `           0    0    activity_activity_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('habit_tracker.activity_activity_id_seq', 25, true);
          habit_tracker               postgres    false    218            a           0    0 $   activity_habit_tracker_detail_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('habit_tracker.activity_habit_tracker_detail_id_seq', 4, true);
          habit_tracker               postgres    false    237            b           0    0 $   habit_category_habit_category_id_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('habit_tracker.habit_category_habit_category_id_seq', 12, true);
          habit_tracker               postgres    false    232            c           0    0 %   habit_category_habit_category_id_seq1    SEQUENCE SET     Z   SELECT pg_catalog.setval('habit_tracker.habit_category_habit_category_id_seq1', 8, true);
          habit_tracker               postgres    false    235            d           0    0    habit_habit_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('habit_tracker.habit_habit_id_seq', 26, true);
          habit_tracker               postgres    false    220            e           0    0 )   habit_tracker_habit_tracker_detail_id_seq    SEQUENCE SET     _   SELECT pg_catalog.setval('habit_tracker.habit_tracker_habit_tracker_detail_id_seq', 20, true);
          habit_tracker               postgres    false    236            f           0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('habit_tracker.habit_tracker_habit_tracker_id_seq', 39, true);
          habit_tracker               postgres    false    222            g           0    0    mood_mood_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.mood_mood_id_seq', 39, true);
          habit_tracker               postgres    false    224            h           0    0    note_note_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.note_note_id_seq', 25, true);
          habit_tracker               postgres    false    226            i           0    0    question_question_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('habit_tracker.question_question_id_seq', 58, true);
          habit_tracker               postgres    false    228            j           0    0    user_user_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('habit_tracker.user_user_id_seq', 2, true);
          habit_tracker               postgres    false    230            �           2606    16801    activity activity_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (activity_id);
 G   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_pkey;
       habit_tracker                 postgres    false    219            �           2606    16896    category habit_category_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY habit_tracker.category
    ADD CONSTRAINT habit_category_pkey PRIMARY KEY (category_id);
 M   ALTER TABLE ONLY habit_tracker.category DROP CONSTRAINT habit_category_pkey;
       habit_tracker                 postgres    false    233            �           2606    16940 #   habit_category habit_category_pkey1 
   CONSTRAINT     w   ALTER TABLE ONLY habit_tracker.habit_category
    ADD CONSTRAINT habit_category_pkey1 PRIMARY KEY (habit_category_id);
 T   ALTER TABLE ONLY habit_tracker.habit_category DROP CONSTRAINT habit_category_pkey1;
       habit_tracker                 postgres    false    234            �           2606    16810    habit habit_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY habit_tracker.habit
    ADD CONSTRAINT habit_pkey PRIMARY KEY (habit_id);
 A   ALTER TABLE ONLY habit_tracker.habit DROP CONSTRAINT habit_pkey;
       habit_tracker                 postgres    false    221            �           2606    16824    mood mood_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY habit_tracker.mood
    ADD CONSTRAINT mood_pkey PRIMARY KEY (mood_id);
 ?   ALTER TABLE ONLY habit_tracker.mood DROP CONSTRAINT mood_pkey;
       habit_tracker                 postgres    false    225            �           2606    16831    note note_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY habit_tracker.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (note_id);
 ?   ALTER TABLE ONLY habit_tracker.note DROP CONSTRAINT note_pkey;
       habit_tracker                 postgres    false    227            �           2606    16838    question question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY habit_tracker.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);
 G   ALTER TABLE ONLY habit_tracker.question DROP CONSTRAINT question_pkey;
       habit_tracker                 postgres    false    229            �           2606    16847    user user_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY habit_tracker."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);
 A   ALTER TABLE ONLY habit_tracker."user" DROP CONSTRAINT user_pkey;
       habit_tracker                 postgres    false    231            �           2620    16884    note insert_note_trigger    TRIGGER     �   CREATE TRIGGER insert_note_trigger AFTER INSERT ON habit_tracker.note FOR EACH ROW EXECUTE FUNCTION habit_tracker.insert_note_function();
 8   DROP TRIGGER insert_note_trigger ON habit_tracker.note;
       habit_tracker               postgres    false    238    227            �           2606    16858    activity activity_mood_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_mood_id_fkey FOREIGN KEY (mood_id) REFERENCES habit_tracker.mood(mood_id) NOT VALID;
 O   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_mood_id_fkey;
       habit_tracker               postgres    false    225    4754    219            �           2606    16853    activity activity_note_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_note_id_fkey FOREIGN KEY (note_id) REFERENCES habit_tracker.note(note_id) NOT VALID;
 O   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_note_id_fkey;
       habit_tracker               postgres    false    227    4756    219            �           2606    16848    activity activity_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) ON DELETE CASCADE NOT VALID;
 O   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_user_id_fkey;
       habit_tracker               postgres    false    219    231    4760            �           2606    16951 .   habit_category habit_category_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_category
    ADD CONSTRAINT habit_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES habit_tracker.category(category_id) NOT VALID;
 _   ALTER TABLE ONLY habit_tracker.habit_category DROP CONSTRAINT habit_category_category_id_fkey;
       habit_tracker               postgres    false    233    4762    234            �           2606    16946 +   habit_category habit_category_habit_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_category
    ADD CONSTRAINT habit_category_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habit_tracker.habit(habit_id) NOT VALID;
 \   ALTER TABLE ONLY habit_tracker.habit_category DROP CONSTRAINT habit_category_habit_id_fkey;
       habit_tracker               postgres    false    234    221    4752            �           2606    16903 $   category habit_category_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.category
    ADD CONSTRAINT habit_category_user_id_fkey FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) ON DELETE CASCADE NOT VALID;
 U   ALTER TABLE ONLY habit_tracker.category DROP CONSTRAINT habit_category_user_id_fkey;
       habit_tracker               postgres    false    233    231    4760            �           2606    16941 +   habit_category habit_category_user_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_category
    ADD CONSTRAINT habit_category_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) NOT VALID;
 \   ALTER TABLE ONLY habit_tracker.habit_category DROP CONSTRAINT habit_category_user_id_fkey1;
       habit_tracker               postgres    false    231    4760    234            �           2606    16863 )   habit_tracker habit_tracker_habit_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_tracker_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habit_tracker.habit(habit_id) ON DELETE CASCADE NOT VALID;
 Z   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_tracker_habit_id_fkey;
       habit_tracker               postgres    false    221    4752    223            �           2606    16908    habit habit_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit
    ADD CONSTRAINT habit_user_id_fkey FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) NOT VALID;
 I   ALTER TABLE ONLY habit_tracker.habit DROP CONSTRAINT habit_user_id_fkey;
       habit_tracker               postgres    false    221    4760    231            �           2606    16885    mood mood_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.mood
    ADD CONSTRAINT mood_user_id_fkey FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) ON DELETE CASCADE NOT VALID;
 G   ALTER TABLE ONLY habit_tracker.mood DROP CONSTRAINT mood_user_id_fkey;
       habit_tracker               postgres    false    4760    225    231            �           2606    16873    note note_question_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.note
    ADD CONSTRAINT note_question_id_fkey FOREIGN KEY (question_id) REFERENCES habit_tracker.question(question_id) NOT VALID;
 K   ALTER TABLE ONLY habit_tracker.note DROP CONSTRAINT note_question_id_fkey;
       habit_tracker               postgres    false    4758    229    227            �           2606    16878    note note_question_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.note
    ADD CONSTRAINT note_question_id_fkey1 FOREIGN KEY (question_id) REFERENCES habit_tracker.question(question_id) NOT VALID;
 L   ALTER TABLE ONLY habit_tracker.note DROP CONSTRAINT note_question_id_fkey1;
       habit_tracker               postgres    false    229    227    4758            <   "   x�32�4���4202�50�5� �L�b���� NN�      J      x�34���LK�4����� ��      >      x�32�,.�/*�4����� #��      K      x���42�44�4����� �      @      x�3��42�44�26�20�4����� +(y      B      x������ � �      D      x������ � �      F   �  x��V;��8�[����O�H�*�	6�"AI� P*m�Cl���I�5j��	��T�k����n$����Z酴J��*%L-����l�ծU��uf����nR�I)���1~��h�z���q�Q��;h�>�S�"��J�D//8^�J���TW#Dޔ�7/�[?#�Ь�R#���-m㱮ĝp4�K����i�������-=gz�Ӱ�I�z�p7j��͞��=93$��܏����ġ!Փh�U��,/�a�j�b�J�kܾ���#/��MJ�V������L]��3�FT�76�(q�[�̒���O�;��stF�"�쑛���r��g�����@��yQj����/_�����܄�Gc�&i�N��U����"��l?����?�w�@�L�	�A��t�7z+���.n�︧dڜ��%h��b-�����q�HBԁ�ê���X%=���=�+���e���$#S�R��ҥ�z�A��l&ϛ�p�e��K�8���Q�H�O��('$��8y�\��2�4_U�\_\]Ju8�6��]��!���x*��n��,Kӏ:��=b��n?�)[�ujh�Af����ҥPC�	Շ�*��Bu��<����)]���W$4#�@�#����Y�p5�UUoyc9���f���+e��Y�D43�Y����MFJ<K(Kf��*��y�%&�8�R��j���?��ښ&�J1C{�V��J�i6������9e�S�W�Z��p�Os��l�w�"J9�ZbN�-e�K��X�9�(�-���ꩫ5T�V�=e�5��t���(�^V*�q��i�D�������/w���
æS�3� �� z�<����v|�%¸B���)3��܊Ν)8�-0��	��8O)O���{RHɬ��g�g+��QwK���/����`D`��O:T
���Yvb���œ���g'zb'����m̶��u� �΍+�{(��r�z�yS]�0>t�Q��K�/'p�[�F0*f����J�!��<o<C�ueu�!��9�����U�e��{|�T�M�ˬ��j���s�	P��\�-džq�^�g�7���r>P�6�R����0?jX>|To����ZdTd��,�Sհ���>ozd���7ȩx־�Wc��s��rY<���-Jԃh�����!z[*��̫(����c�}GHPXV��sSxOяw3qQ̣�خ:n�~�l6��fwK      H   =   x�3���I�t�/�//�N���I442v(/�+���H,>ڔ�s����Yp��qqq ʲ�     